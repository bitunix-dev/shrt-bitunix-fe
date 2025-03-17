import React from "react";
import { Button } from "../ui/button";

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  lastPage,
  onPageChange,
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