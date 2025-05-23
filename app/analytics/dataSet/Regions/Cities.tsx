"use client";
import { useGetClicksCities } from "@/hooks/useGetClicksCities";
import { Button } from "@/components/ui/button";
import { clientApiRequest } from "@/services/clientApiRequest";
import {
  ApiResponse,
  isPaginatedResponse,
  CityData,
} from "@/app/Get/dataTypes";
import React, { useState, useEffect } from "react";

// Function to get date 2 weeks ago in Dubai timezone
const getTwoWeeksAgoInDubai = (): string => {
  const now = new Date();
  const twoWeeksAgo = new Date(now.getTime() - (14 * 24 * 60 * 60 * 1000));
  
  // Convert to Dubai timezone (UTC+4)
  const dubaiTime = new Date(twoWeeksAgo.toLocaleString("en-US", {
    timeZone: "Asia/Dubai"
  }));
  
  // Format as YYYY-MM-DD
  return dubaiTime.toISOString().split('T')[0];
};

// Function to get current date in Dubai timezone
const getCurrentDateInDubai = (): string => {
  const now = new Date();
  
  // Convert to Dubai timezone (UTC+4)
  const dubaiTime = new Date(now.toLocaleString("en-US", {
    timeZone: "Asia/Dubai"
  }));
  
  // Format as YYYY-MM-DD
  return dubaiTime.toISOString().split('T')[0];
};

// Pagination component
const Pagination = ({
  currentPage,
  lastPage,
  onPageChange,
}: {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
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

interface CitiesProps {
  data: {
    currentPage: number;
    lastPage: number;
    data: CityData[];
    total: number;
  };
  setData: React.Dispatch<
    React.SetStateAction<{
      currentPage: number;
      lastPage: number;
      data: CityData[];
      total: number;
    }>
  >;
  isClickShortLink: boolean;
}

export const Cities: React.FC<CitiesProps> = ({
  data,
  setData,
  isClickShortLink,
}) => {
  const { data: initialData, isLoading: initialLoading } = useGetClicksCities();
  const [loading, setLoading] = useState(false);

  // Initialize pagination data from initial fetch
  useEffect(() => {
    if (!isClickShortLink) {
      if (initialData?.data) {
        // Use the isPaginatedResponse type guard
        if (!isPaginatedResponse(initialData.data)) {
          // Handle non-paginated response (for backward compatibility)
          setData({
            currentPage: 1,
            lastPage: 1,
            data: initialData.data as CityData[],
            total: initialData.data.length,
          });
        } else {
          // Handle paginated response
          setData({
            currentPage: initialData.data.current_page,
            lastPage: initialData.data.last_page,
            data: initialData.data.data as CityData[],
            total: initialData.data.total,
          });
        }
      }
    }
  }, [initialData, setData]);

  // Fetch data with pagination
  const fetchData = async (page: number) => {
    setLoading(true);
    if (!isClickShortLink) {
      try {
        const startDate = getTwoWeeksAgoInDubai();
        const endDate = getCurrentDateInDubai();
        
        const response = await clientApiRequest<ApiResponse<CityData>>({
          endpoint: "analytics/cities",
          method: "GET",
          params: { 
            page,
            start_date: startDate,
            end_date: endDate
          },
        });

        // Use type guard to handle different response formats
        if (response.data) {
          if (isPaginatedResponse(response.data)) {
            // It's a paginated response
            setData({
              currentPage: response.data.current_page,
              lastPage: response.data.last_page,
              data: response.data.data,
              total: response.data.total,
            });
          } else {
            // It's a direct array
            setData({
              currentPage: 1,
              lastPage: 1,
              data: response.data,
              total: response.data.length,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching paginated city data:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    fetchData(page);
  };

  // Determine if we're loading
  const isLoading = initialLoading || loading;

  return (
    <div>
      {isLoading ? (
        <div className="py-4 flex justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-[var(--bitunix)]"></div>
        </div>
      ) : data.data.length > 0 ? (
        <>
          {data.data.map((item, index) => (
            <div
              key={item.city + index}
              className="bg-neutral-700 text-white py-2 px-3 rounded-md w-full flex justify-between mb-2 transition-all duration-300 ease-in-out hover:border-l-4 hover:border-lime-500"
            >
              <div className="flex items-center">
                <img
                  src={item.country_flag}
                  alt={`${item.city} flag`}
                  width={24}
                  height={16}
                  className="w-6 h-4 rounded mr-2"
                />
                <p>{item.city}</p>
              </div>
              <span className="font-bold">
                {Number(item.total_clicks).toLocaleString("en-US")} clicks
              </span>
            </div>
          ))}

          {/* Pagination - only show if more than one page */}
          {data.lastPage > 1 && (
            <Pagination
              currentPage={data.currentPage}
              lastPage={data.lastPage}
              onPageChange={handlePageChange}
            />
          )}
        </>
      ) : (
        <p className="text-center text-gray-500">No city data available</p>
      )}
    </div>
  );
};