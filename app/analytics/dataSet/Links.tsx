"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useGetUrls } from "@/hooks/useGetUrls";
import { clientApiRequest } from "@/services/clientApiRequest";
import { ApiResponse, UrlData, PaginatedData, isPaginatedResponse } from "@/app/Get/dataTypes";
import Image from "next/image";
import * as React from "react";

// Define Pagination component props
interface PaginationProps {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}

// Pagination component
const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  lastPage, 
  onPageChange 
}) => {
  // Create array of page numbers to show
  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    const maxDisplayed = 5; // Maximum number of page buttons to display
    
    // Logic to display appropriate page numbers
    if (lastPage <= maxDisplayed) {
      // If we have few pages, show all of them
      for (let i = 1; i <= lastPage; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Complex logic for many pages
      // Always include page 1
      pageNumbers.push(1);
      
      // Calculate start and end of displayed range
      const rangeStart = Math.max(2, currentPage - 1);
      const rangeEnd = Math.min(lastPage - 1, currentPage + 1);
      
      // Add ellipsis after page 1 if needed
      if (rangeStart > 2) {
        pageNumbers.push("ellipsis1");
      }
      
      // Add pages in range
      for (let i = rangeStart; i <= rangeEnd; i++) {
        pageNumbers.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (rangeEnd < lastPage - 1) {
        pageNumbers.push("ellipsis2");
      }
      
      // Always include last page if it's not already included
      if (lastPage !== 1) {
        pageNumbers.push(lastPage);
      }
    }
    
    return pageNumbers;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      {/* Previous Button */}
      <Button
        className="bg-[var(--bitunix)] hover:bg-[var(--bitunix-hover)] text-black"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        size="sm"
      >
        ←
      </Button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) => {
          if (page === "ellipsis1" || page === "ellipsis2") {
            return (
              <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
                ...
              </span>
            );
          }
          
          return (
            <Button
              key={index}
              onClick={() => onPageChange(page as number)}
              className={
                page === currentPage
                  ? "bg-[var(--bitunix)] text-black"
                  : "bg-neutral-800 hover:bg-neutral-700 text-white"
              }
              size="sm"
            >
              {page}
            </Button>
          );
        })}
      </div>

      {/* Next Button */}
      <Button
        className="bg-[var(--bitunix)] hover:bg-[var(--bitunix-hover)] text-black"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === lastPage}
        size="sm"
      >
        →
      </Button>
    </div>
  );
};

// Props for FaviconWithFallback component
interface FaviconWithFallbackProps {
  url: string | URL;
}

export const Links = () => {
  const { data: initialData, isLoading: initialLoading } = useGetUrls();
  const [loading, setLoading] = React.useState(false);
  const [paginationData, setPaginationData] = React.useState<{
    currentPage: number;
    lastPage: number;
    data: UrlData[];
    total: number;
  }>({
    currentPage: 1,
    lastPage: 1,
    data: [],
    total: 0
  });

  // Initialize pagination data from initial fetch
  React.useEffect(() => {
    if (initialData?.data) {
      // Use the isPaginatedResponse type guard if available
      if (typeof initialData.data === 'object' && 'current_page' in initialData.data) {
        const paginatedData = initialData.data as PaginatedData<UrlData>;
        setPaginationData({
          currentPage: paginatedData.current_page,
          lastPage: paginatedData.last_page,
          data: paginatedData.data || [],
          total: paginatedData.total
        });
      } else if (Array.isArray(initialData.data)) {
        // Handle non-paginated response (for backward compatibility)
        setPaginationData({
          currentPage: 1,
          lastPage: 1,
          data: initialData.data as UrlData[],
          total: initialData.data.length
        });
      }
    }
  }, [initialData]);

  // Fetch data with pagination
  const fetchData = async (page: number) => {
    setLoading(true);
    try {
      const response = await clientApiRequest<ApiResponse<UrlData>>({
        endpoint: "urls",
        method: "GET",
        params: { page }
      });

      if (typeof response.data === 'object' && 'current_page' in response.data) {
        const paginatedData = response.data as PaginatedData<UrlData>;
        setPaginationData({
          currentPage: paginatedData.current_page,
          lastPage: paginatedData.last_page,
          data: paginatedData.data || [],
          total: paginatedData.total
        });
      } else if (Array.isArray(response.data)) {
        setPaginationData({
          currentPage: 1,
          lastPage: 1,
          data: response.data as UrlData[],
          total: response.data.length
        });
      }
    } catch (error) {
      console.error("Error fetching paginated data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    fetchData(page);
  };

  const getFavicon = (url: string | URL): string => {
    try {
      const hostname = new URL(url.toString()).hostname;
      return `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
    } catch (error) {
      console.error("Invalid URL:", url);
      return "/default-favicon.png";
    }
  };

  const FaviconWithFallback: React.FC<FaviconWithFallbackProps> = ({ url }) => {
    const [faviconExists, setFaviconExists] = React.useState(true);
    const faviconUrl = getFavicon(url);

    return (
      <div className="w-6 h-6 flex items-center justify-center mr-2">
        {faviconExists ? (
          <Image
            src={faviconUrl}
            alt="Favicon URL"
            width={16}
            height={16}
            className="w-4 h-4 rounded-full border-2 border-green-400 p-0.5"
            onError={() => setFaviconExists(false)}
          />
        ) : (
          <div className="w-6 h-6 rounded-full bg-green-400"></div>
        )}
      </div>
    );
  };

  // Determine if we're loading
  const isLoading = initialLoading || loading;
  
  return (
    <>
      <Tabs defaultValue="shortLinks">
        <Card className="bg-neutral-800 border border-neutral-800 text-white h-max box-border px-0">
          <CardHeader className="flex justify-between">
            <TabsList className="bg-transparent gap-2 text-black py-5">
              <TabsTrigger
                className="bg-[var(--bitunix)] hover:bg-[var(--bitunix-hover)] py-2 px-4"
                value="shortLinks"
              >
                Short links
              </TabsTrigger>
              <TabsTrigger
                className="bg-[var(--bitunix)] hover:bg-[var(--bitunix-hover)] py-2 px-4"
                value="destinationUrl"
              >
                Destination URL
              </TabsTrigger>
            </TabsList>
          </CardHeader>
          <TabsContent value="shortLinks">
            <CardContent>
              {isLoading ? (
                <div className="py-4 flex justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-[var(--bitunix)]"></div>
                </div>
              ) : paginationData.data.length > 0 ? (
                paginationData.data.map((item) => (
                  <div
                    key={item.id}
                    className="bg-neutral-700 text-white py-2 px-3 rounded-md flex items-center mb-2 justify-between box-border transition-all duration-300 ease-in-out hover:border-l-4 hover:border-lime-500"
                  >
                    <div className="flex items-center w-[60%]">
                      <FaviconWithFallback url={item.destination_url} />
                      <p className="overflow-hidden">{item.short_link}</p>
                    </div>
                    <div className="font-bold flex gap-2 text-xs md:text-base">
                      {Number(item.clicks).toLocaleString("en-US")}
                      <p>clicks</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No short links available</p>
              )}
              
              {/* Pagination */}
              {paginationData.lastPage > 1 && (
                <Pagination
                  currentPage={paginationData.currentPage}
                  lastPage={paginationData.lastPage}
                  onPageChange={handlePageChange}
                />
              )}
            </CardContent>
          </TabsContent>
          <TabsContent value="destinationUrl">
            <CardContent>
              {isLoading ? (
                <div className="py-4 flex justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-[var(--bitunix)]"></div>
                </div>
              ) : paginationData.data.length > 0 ? (
                paginationData.data.map((item) => (
                  <div
                    key={item.id}
                    className="bg-neutral-700 text-white py-2 px-3 rounded-md flex justify-between mb-2 transition-all duration-300 ease-in-out hover:border-l-4 hover:border-lime-500"
                  >
                    <span
                      className="hidden md:inline"
                      title={item.destination_url}
                    >
                      <div className="flex items-center">
                        <FaviconWithFallback url={item.destination_url} />
                        {item.destination_url.length > 50
                          ? `${item.destination_url.substring(0, 50)}...`
                          : item.destination_url}
                      </div>
                    </span>
                    <span className="font-bold">
                      {Number(item.clicks).toLocaleString("en-US")} clicks
                    </span>
                  </div>
                ))
              ) : (
                <p>No destination URLs available</p>
              )}
              
              {/* Pagination (also shown in destination URL tab) */}
              {paginationData.lastPage > 1 && (
                <Pagination
                  currentPage={paginationData.currentPage}
                  lastPage={paginationData.lastPage}
                  onPageChange={handlePageChange}
                />
              )}
            </CardContent>
          </TabsContent>
        </Card>
      </Tabs>
    </>
  );
};