"use client";

import * as React from "react";
import { Copy, ExternalLink, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Header } from "./Header";
import { Pagination } from "./Pagination";
import { ModalForQRCode } from "./ModalForQRCode";
import Image from "next/image";
import toast from "react-hot-toast";
import { clientApiRequest } from "@/services/clientApiRequest";
import { ApiResponse, PaginatedData, UrlData, isPaginatedResponse } from "@/app/Get/dataTypes";

// Updated DataTable Props interface
interface DataTableProps {
  BtnCreate: React.ReactNode;
  initialData?: ApiResponse<UrlData>['data'] | null; // Allow undefined, null, or either response format
}

export const DataTable: React.FC<DataTableProps> = ({ BtnCreate, initialData }) => {
  const [loading, setLoading] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [qrCodeItem, setQrCodeItem] = React.useState<UrlData | null>(null);
  
  // State for items per page
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  
  // State untuk menyimpan data dari API dengan pagination
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
    if (initialData) {
      // Check which type of response we received
      if (isPaginatedResponse(initialData)) {
        // Handle paginated data
        setPaginationData({
          currentPage: initialData.current_page,
          lastPage: initialData.last_page,
          data: initialData.data,
          total: initialData.total
        });
      } else if (Array.isArray(initialData)) {
        // Handle array data
        setPaginationData({
          currentPage: 1,
          lastPage: 1,
          data: initialData,
          total: initialData.length
        });
      }
    } else {
      // If no initial data, fetch first page
      fetchData(1);
    }
  }, [initialData]);

  // Fetch data with pagination from server
  const fetchData = async (page: number, perPage: number = itemsPerPage) => {
    setLoading(true);
    try {
      // Prepare query parameters for pagination (no search parameter)
      const params: Record<string, string | number | boolean> = { 
        page,
        p: perPage
      };

      // API request with pagination parameters
      const response = await clientApiRequest<ApiResponse<UrlData>>({
        endpoint: "urls",
        method: "GET",
        params
      });

      // Update state with paginated data from server
      if (isPaginatedResponse(response.data)) {
        setPaginationData({
          currentPage: response.data.current_page,
          lastPage: response.data.last_page,
          data: response.data.data,
          total: response.data.total
        });
      } else if (Array.isArray(response.data)) {
        setPaginationData({
          currentPage: 1,
          lastPage: 1,
          data: response.data,
          total: response.data.length
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  // Apply client-side filtering to the current page of data
  const filteredData = React.useMemo(() => {
    if (!searchQuery.trim()) {
      return paginationData.data;
    }
    
    return paginationData.data.filter(item => {
      const query = searchQuery.toLowerCase();
      
      // Search in short_link
      if (item.short_link && item.short_link.toLowerCase().includes(query)) {
        return true;
      }
      
      // Search in destination_url
      if (item.destination_url && item.destination_url.toLowerCase().includes(query)) {
        return true;
      }
      
      // Search in tags
      if (Array.isArray(item.tags) && item.tags.some(tag => {
        if (typeof tag === 'string') {
          return tag.toLowerCase().includes(query);
        } else if (tag && typeof tag === 'object' && tag.name) {
          return tag.name.toLowerCase().includes(query);
        }
        return false;
      })) {
        return true;
      }
      
      return false;
    });
  }, [paginationData.data, searchQuery]);

  // Handle page change (server-side)
  const handlePageChange = (page: number) => {
    fetchData(page, itemsPerPage);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    fetchData(1, value); // Reset to page 1 when changing items per page
  };

  const getFavicon = (url: string | URL) => {
    try {
      const hostname = new URL(url.toString()).hostname;
      return `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
    } catch (error) {
      console.error("Invalid URL:", url);
      return "/default-favicon.png"; // Gambar default jika URL tidak valid
    }
  };

  const FaviconWithFallback = ({ url }: { url: string | URL }) => {
    const [faviconExists, setFaviconExists] = React.useState(true);
    const faviconUrl = getFavicon(url);

    return (
      <div className="w-8 h-8 flex items-center justify-center">
        {faviconExists ? (
          <img
            src={faviconUrl}
            alt="Favicon URL"
            className="w-7 h-7 rounded-full border-2 border-green-400 p-0.5"
            onError={() => setFaviconExists(false)}
          />
        ) : (
          <div className="w-6 h-6 rounded-full bg-green-400"></div>
        )}
      </div>
    );
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Shorten link has been copied!", {
      position: "top-right",
      duration: 2000,
      style: {
        background: "#333",
        color: "#fff",
      },
    });
  };

  return (
    <div className="w-full mb-20">
      {/* HEADER */}
      <Header 
        BtnCreate={BtnCreate} 
        setSearchQuery={setSearchQuery} 
        // initialSearchQuery={searchQuery}
        // isSearching={searchQuery !== ""}
      />
      
      {/* LIST VIEW */}
      <div className="mt-4 space-y-2">
        {loading ? (
          <div className="py-8 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--bitunix)]"></div>
          </div>
        ) : filteredData && filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <div
              key={index}
              className="lg:flex items-center w-full justify-between bg-neutral-800 border border-neutral-800 p-4 rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-4">
                {/* Status Indicator */}
                <FaviconWithFallback url={item.destination_url} />

                {/* Link Info */}
                <div>
                  <div className="flex items-center gap-2 text-lg font-semibold text-white">
                    {item.short_link}
                    <button
                      className="text-gray-500 hover:text-white"
                      onClick={() => handleCopy(item.short_link || '')}
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="text-gray-500 text-sm w-full">
                    <a
                      href={item.destination_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:underline"
                    >
                      ↳
                      <span
                        className="hidden md:inline"
                        title={item.destination_url}
                      >
                        {item.destination_url.length > 100
                          ? `${item.destination_url.substring(0, 100)}...`
                          : item.destination_url}
                      </span>
                      <span
                        className="inline md:hidden truncate max-w-[300px]"
                        title={item.destination_url}
                      >
                        {item.destination_url.length > 30
                          ? `${item.destination_url.substring(0, 30)}...`
                          : item.destination_url}
                      </span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Tags & Clicks */}
              <div className="flex items-center gap-2">
                {Array.isArray(item.tags) && item.tags.length > 0 && (
                  <div className="flex items-center gap-1">
                    {item.tags
                      .slice(0, 2)
                      .map((tag: any, tagIndex: number) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 text-xs font-medium text-black bg-[var(--bitunix)] rounded-md"
                        >
                          {typeof tag === 'string' ? tag : tag.name}
                        </span>
                      ))}
                    {item.tags.length > 2 && (
                      <span className="px-2 py-1 text-xs font-medium text-black bg-lime-400 rounded-md">
                        +{item.tags.length - 2}
                      </span>
                    )}
                  </div>
                )}

                <span className="text-sm bg-neutral-600 text-white px-3 py-1 border-neutral-800 rounded-md flex items-center gap-1">
                  <Image
                    src="https://res.cloudinary.com/dilb4d364/image/upload/v1741254010/heart-rate_mmawvw.png"
                    alt="Click Icon"
                    width={16}
                    height={16}
                    className="w-4 h-4"
                  />
                  {Number(item.clicks || 0).toLocaleString("en-US")} clicks
                </span>

                {/* Actions */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0 text-white">
                      <MoreHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-neutral-900 text-white border border-bg-neutral-800"
                  >
                    <DropdownMenuItem onClick={() => setQrCodeItem(item)}>
                      QR Code
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => handleCopy(item.short_link || '')}
                    >
                      Copy Link ID
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            {searchQuery ? `No results found for "${searchQuery}" on this page.` : "No results found."}
          </p>
        )}
      </div>
      
      {/* Search notification */}
      {searchQuery && (
        <div className="mt-4 text-sm text-gray-400 text-center">
          {filteredData.length > 0 
            ? `Found ${filteredData.length} result${filteredData.length !== 1 ? 's' : ''} for "${searchQuery}" on this page.`
            : ''}
        </div>
      )}
      
      {/* PAGINATION CONTROL */}
      {/* {paginationData.lastPage > 1 && ( */}
        <Pagination
          currentPage={paginationData.currentPage}
          lastPage={paginationData.lastPage}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
          totalItems={paginationData.total}
        />
      {/* )} */}
      
      {/* Modal QR Code */}
      {qrCodeItem && (
        <ModalForQRCode item={qrCodeItem} onClose={() => setQrCodeItem(null)} />
      )}
    </div>
  );
};