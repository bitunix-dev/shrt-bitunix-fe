import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (value: number) => void;
  totalItems?: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  lastPage,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
  totalItems = 0,
}) => {
  // State for custom items per page input
  const [customPageSize, setCustomPageSize] = useState("");
  
  // Preset options for items per page
  const pageSizeOptions = [10, 20, 50, 100];

  // Create array of page numbers to show
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
      
      if (rangeStart > 2) {
        pageNumbers.push("ellipsis1");
      }
      
      for (let i = rangeStart; i <= rangeEnd; i++) {
        pageNumbers.push(i);
      }
      
      if (rangeEnd < lastPage - 1) {
        pageNumbers.push("ellipsis2");
      }
      
      if (lastPage !== 1) {
        pageNumbers.push(lastPage);
      }
    }
    
    return pageNumbers;
  };

  // Handle page size change from preset options
  const handlePageSizeChange = (newSize: number) => {
    onItemsPerPageChange(newSize);
    // Reset to page 1 when changing page size
    if (currentPage !== 1) {
      onPageChange(1);
    }
  };

  // Handle custom page size input change
  const handleCustomInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numeric input
    const value = e.target.value.replace(/[^0-9]/g, "");
    setCustomPageSize(value);
  };

  // Apply custom page size when user presses Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && customPageSize) {
      const size = parseInt(customPageSize, 10);
      if (size > 0) {
        handlePageSizeChange(size);
        setCustomPageSize(""); // Clear input after applying
      }
    }
  };

  // Apply custom page size on blur
  const handleBlur = () => {
    if (customPageSize) {
      const size = parseInt(customPageSize, 10);
      if (size > 0) {
        handlePageSizeChange(size);
        setCustomPageSize(""); // Clear input after applying
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6">
      {/* Page Size Selector */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-400">Show:</span>
        
        {/* Preset buttons */}
        <div className="flex gap-1">
          {pageSizeOptions.map(size => (
            <Button
              key={size}
              onClick={() => handlePageSizeChange(size)}
              className={
                size === itemsPerPage
                  ? "bg-[var(--bitunix)] text-black"
                  : "bg-neutral-800 hover:bg-neutral-700 text-white"
              }
              size="sm"
            >
              {size}
            </Button>
          ))}
        </div>
        
        {/* Custom input */}
        <div className="relative">
          <input
            type="text"
            value={customPageSize}
            onChange={handleCustomInput}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            className="w-16 h-8 bg-neutral-800 text-white text-center rounded-md border border-neutral-700"
            placeholder="Custom"
            aria-label="Custom items per page"
          />
        </div>
      </div>

      {/* Page Navigation Controls */}
      <div className="flex items-center gap-2">
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
      
      {/* Page Info */}
      <div className="text-sm text-gray-400">
        {totalItems > 0 ? (
          <>
            Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}-
            {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} items
          </>
        ) : (
          <>
            Page {currentPage} of {lastPage}
          </>
        )}
      </div>
    </div>
  );
};