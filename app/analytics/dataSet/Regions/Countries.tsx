"use client";
import { useGetClicksCountries } from "@/hooks/useGetClicksCountries";
import { Button } from "@/components/ui/button";
import { clientApiRequest } from "@/services/clientApiRequest";
import {
  ApiResponse,
  isPaginatedResponse,
  CountryData
} from "@/app/Get/dataTypes";
import React, { useState, useEffect } from "react";

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
  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    const maxDisplayed = 5;

    if (lastPage <= maxDisplayed) {
      for (let i = 1; i <= lastPage; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      const rangeStart = Math.max(2, currentPage - 1);
      const rangeEnd = Math.min(lastPage - 1, currentPage + 1);

      if (rangeStart > 2) pageNumbers.push("ellipsis1");
      for (let i = rangeStart; i <= rangeEnd; i++) pageNumbers.push(i);
      if (rangeEnd < lastPage - 1) pageNumbers.push("ellipsis2");

      if (lastPage !== 1) pageNumbers.push(lastPage);
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <Button
        className="bg-[var(--bitunix)] hover:bg-[var(--bitunix-hover)] text-black"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        size="sm"
      >
        ←
      </Button>

      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) =>
          typeof page === "string" ? (
            <span key={page} className="px-2 text-gray-400">...</span>
          ) : (
            <Button
              key={`page-${page}`}
              onClick={() => onPageChange(page)}
              className={
                page === currentPage
                  ? "bg-[var(--bitunix)] text-black"
                  : "bg-neutral-800 hover:bg-neutral-700 text-white"
              }
              size="sm"
            >
              {page}
            </Button>
          )
        )}
      </div>

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

// CountryData type


// Countries Props
interface CountriesProps {
  data: {
    currentPage: number;
    lastPage: number;
    data: CountryData[];
    total: number;
  };
  setData: React.Dispatch<
    React.SetStateAction<{
      currentPage: number;
      lastPage: number;
      data: CountryData[];
      total: number;
    }>
  >;
  isClickShortLink: boolean;
}

export const Countries: React.FC<CountriesProps> = ({
  data,
  setData,
  isClickShortLink,
}) => {
  const { data: initialData, isLoading: initialLoading } = useGetClicksCountries();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isClickShortLink) {
      if (initialData?.data) {
        if (!isPaginatedResponse(initialData.data)) {
          setData({
            currentPage: 1,
            lastPage: 1,
            data: initialData.data as CountryData[],
            total: initialData.data.length,
          });
        } else {
          setData({
            currentPage: initialData.data.current_page,
            lastPage: initialData.data.last_page,
            data: initialData.data.data as CountryData[],
            total: initialData.data.total,
          });
        }
      }
    }
  }, [initialData, setData]);

  const fetchData = async (page: number) => {
    setLoading(true);
    if (!isClickShortLink) {
      try {
        const response = await clientApiRequest<ApiResponse<CountryData>>({
          endpoint: "analytics/countries",
          method: "GET",
          params: { page },
        });

        if (response.data) {
          if (isPaginatedResponse(response.data)) {
            setData({
              currentPage: response.data.current_page,
              lastPage: response.data.last_page,
              data: response.data.data,
              total: response.data.total,
            });
          } else {
            setData({
              currentPage: 1,
              lastPage: 1,
              data: response.data,
              total: response.data.length,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching paginated country data:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handlePageChange = (page: number) => {
    fetchData(page);
  };

  const isLoading = initialLoading || loading;

  return (
    <div>
      <>
        {isLoading ? (
          <div className="py-4 flex justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-[var(--bitunix)]"></div>
          </div>
        ) : data.data?.length > 0 ? (
          <>
            {data.data.map((item, index) => (
              <div
                key={item.country + index}
                className="bg-neutral-700 text-white py-2 px-3 rounded-md flex w-full items-center justify-between mb-2 transition-all duration-300 ease-in-out hover:border-l-4 hover:border-lime-500"
              >
                <div className="flex items-center">
                  <img
                    src={item.country_flag}
                    alt={`${item.country} flag`}
                    width={24}
                    height={16}
                    className="w-6 h-4 rounded mr-2"
                  />
                  <p>{item.country}</p>
                </div>
                <span className="font-bold">
                  {Number(item.total_clicks).toLocaleString("en-US")} clicks
                </span>
              </div>
            ))}

            {data.lastPage > 1 && (
              <Pagination
                currentPage={data.currentPage}
                lastPage={data.lastPage}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          <p className="text-center text-gray-500">No country data available</p>
        )}
      </>
    </div>
  );
};
