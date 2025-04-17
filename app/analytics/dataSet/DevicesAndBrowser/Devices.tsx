"use client";
import { useGetClicksDevices } from "@/hooks/useGetClicksDevices";
import { Button } from "@/components/ui/button";
import { clientApiRequest } from "@/services/clientApiRequest";
import { ApiResponse, isPaginatedResponse, DeviceData } from "@/app/Get/dataTypes";
import React, { useState, useEffect } from "react";

// Pagination component (identical to previous components)
const Pagination = ({
  currentPage,
  lastPage,
  onPageChange
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

// Define specific type for device data

interface DeviceProps {
  data: {
    currentPage: number;
    lastPage: number;
    data: DeviceData[];
    total: number;
  };
  setData: React.Dispatch<
    React.SetStateAction<{
      currentPage: number;
      lastPage: number;
      data: DeviceData[];
      total: number;
    }>
  >;
  isClickShortLink: boolean;
}

export const Devices: React.FC<DeviceProps> = ({
  data,
  setData,
  isClickShortLink
}) => {
  const { data: initialData, isLoading: initialLoading } = useGetClicksDevices();
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
            data: initialData.data as DeviceData[],
            total: initialData.data.length
          });
        } else {
          // Handle paginated response
          setData({
            currentPage: initialData.data.current_page,
            lastPage: initialData.data.last_page,
            data: initialData.data.data as DeviceData[],
            total: initialData.data.total
          });
        }
      }
    }
  }, [initialData]);

  // Fetch data with pagination
  const fetchData = async (page: number) => {
    setLoading(true);
    try {
      const response = await clientApiRequest<ApiResponse<DeviceData>>({
        endpoint: "analytics/devices",
        method: "GET",
        params: { page }
      });

      // Use type guard to handle different response formats
      if (response.data) {
        if (isPaginatedResponse(response.data)) {
          // It's a paginated response
          setData({
            currentPage: response.data.current_page,
            lastPage: response.data.last_page,
            data: response.data.data,
            total: response.data.total
          });
        } else {
          // It's a direct array
          setData({
            currentPage: 1,
            lastPage: 1,
            data: response.data,
            total: response.data.length
          });
        }
      }
    } catch (error) {
      console.error("Error fetching paginated device data:", error);
    } finally {
      setLoading(false);
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
              key={index}
              className="bg-neutral-700 text-white py-2 px-3 rounded-md flex w-full justify-between mb-2 transition-all duration-300 ease-in-out hover:border-l-4 hover:border-lime-500"
            >
              <p>{item.device || "Unknown"}</p>
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
        <p className="text-center text-gray-500">No device data available</p>
      )}
    </div>
  );
};