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
  
  // State untuk menyimpan data dari API
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
    }
  }, [initialData]);

  // Fetch data with pagination
  const fetchData = async (page: number, search?: string) => {
    setLoading(true);
    try {
      // Membuat query parameters
      const params: Record<string, string | number | boolean> = { page };
      if (search && search.trim() !== "") {
        params.search = search;
      }

      // Memanggil API dengan parameter yang sesuai
      const response = await clientApiRequest<ApiResponse<UrlData>>({
        endpoint: "urls",
        method: "GET",
        params
      });

      // Update state with new data
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

  // Effect untuk mencari ketika query berubah (dengan debounce)
  React.useEffect(() => {
    const timer = setTimeout(() => {
      fetchData(1, searchQuery);
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Handle page change
  const handlePageChange = (page: number) => {
    fetchData(page, searchQuery);
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
      <Header BtnCreate={BtnCreate} setSearchQuery={setSearchQuery} />
      
      {/* LIST VIEW */}
      <div className="mt-4 space-y-2">
        {loading ? (
          <div className="py-8 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--bitunix)]"></div>
          </div>
        ) : paginationData.data && paginationData.data.length > 0 ? (
          paginationData.data.map((item, index) => (
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
          <p className="text-center text-gray-500">No results found.</p>
        )}
      </div>
      
      {/* PAGINATION CONTROL */}
      {paginationData.lastPage > 1 && (
        <Pagination
          currentPage={paginationData.currentPage}
          lastPage={paginationData.lastPage}
          onPageChange={handlePageChange}
        />
      )}
      
      {/* Modal QR Code */}
      {qrCodeItem && (
        <ModalForQRCode item={qrCodeItem} onClose={() => setQrCodeItem(null)} />
      )}
    </div>
  );
};