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
import { ModalForEditing } from "./ModalForEditing";

interface DataTableProps {
  BtnCreate: React.ReactNode;
  data: any;
}

export const DataTable: React.FC<DataTableProps> = ({ BtnCreate, data }) => {
  const [selectedItem, setSelectedItem] = React.useState<any>(null);
  const [searchQuery, setSearchQuery] = React.useState(""); // ✅ State pencarian

  // ✅ Paginasi State
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 8;

  // ✅ Filter data berdasarkan searchQuery
  const filteredData = data?.filter((item: any) =>
    item.short_link.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.destination_url.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tags?.some((tag: any) => tag.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // ✅ Hitung jumlah total halaman
  const totalPages = Math.ceil((filteredData?.length || 0) / itemsPerPage);

  // ✅ Filter data sesuai halaman aktif
  const paginatedData = filteredData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ✅ Fungsi Navigasi Halaman
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const getFavicon = (url: string | URL) => {
    try {
      const hostname = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
    } catch (error) {
      console.error("Invalid URL:", url);
      return "/default-favicon.png"; // ✅ Gambar default jika URL tidak valid
    }
  };

  const FaviconWithFallback = ({ url }: { url: string | URL }) => {
    const [faviconExists, setFaviconExists] = React.useState(true);
    const faviconUrl = getFavicon(url);

    return (
      <div className="w-6 h-6 flex items-center justify-center">
        {faviconExists ? (
          <img
            src={faviconUrl}
            alt="Favicon"
            className="w-6 h-6 rounded-full border-2 border-green-400"
            onError={() => setFaviconExists(false)} // ✅ Jika gagal, tampilkan fallback
          />
        ) : (
          <img
            src="/default-favicon.png"
            alt="Fallback Favicon"
            className="w-6 h-6 rounded-full border-2 border-gray-400"
          />
        )}
      </div>
    );
  };

  return (
    <div className="w-full mb-20">
      {/* HEADER */}
      <Header BtnCreate={BtnCreate} setSearchQuery={setSearchQuery} /> {/* ✅ Pass setSearchQuery */}

      {/* LIST VIEW */}
      <div className="mt-4 space-y-2">
        {paginatedData && paginatedData.length ? (
          paginatedData.map((item: any, index: number) => (
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
                      onClick={() =>
                        navigator.clipboard.writeText(item.short_link)
                      }
                    >
                      <Copy className="w-4 h-4" />
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
                      <span className="hidden md:inline">{item.destination_url}</span>
                      <span className="inline md:hidden truncate max-w-[200px]" title={item.destination_url}>
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
                {item.tags?.length > 0 && (
                  <span className="px-2 py-1 text-xs font-medium text-black bg-lime-500 rounded-md">
                    {item.tags[0].name}
                  </span>
                )}
                <span className="text-sm bg-neutral-600 text-white px-3 py-1 border-neutral-800 rounded-md">
                  👆 {item.clicks} clicks
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
                    
                    <DropdownMenuItem>QR Code</DropdownMenuItem>
                    <DropdownMenuItem>Copy Link ID</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No results.</p>
        )}
      </div>

      {/* ✅ PAGINATION CONTROL */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      )}

      {/* Modal for Editing */}
      {selectedItem && (
        <ModalForEditing
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      )}
    </div>
  );
};
