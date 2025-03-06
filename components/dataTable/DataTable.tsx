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
import Image from "next/image";
import toast from "react-hot-toast";

interface DataTableProps {
  BtnCreate: React.ReactNode;
  data: any;
}

export const DataTable: React.FC<DataTableProps> = ({ BtnCreate, data }) => {
  const [selectedItem, setSelectedItem] = React.useState<any>(null);
  const [searchQuery, setSearchQuery] = React.useState(""); // ✅ State pencarian

  // ✅ Paginasi State
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  // ✅ Filter data berdasarkan searchQuery
  const filteredData = data?.filter(
    (item: any) =>
      item.short_link.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.destination_url.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags?.some((tag: any) =>
        tag.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  // ✅ Hitung jumlah total halaman
  const totalPages = Math.ceil((filteredData?.length || 0) / itemsPerPage);

  // ✅ Filter data sesuai halaman aktif
  const paginatedData = filteredData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ✅ Fungsi Navigasi Halaman
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
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
      <Header BtnCreate={BtnCreate} setSearchQuery={setSearchQuery} />{" "}
      {/* ✅ Pass setSearchQuery */}
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
                      onClick={() => handleCopy(item.short_link)} // ✅ Gunakan handleCopy
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
                      <span
                        className="hidden md:inline"
                        title={item.destination_url}
                      >
                        {item.destination_url.length > 155
                          ? `${item.destination_url.substring(0, 155)}...`
                          : item.destination_url}
                      </span>
                      {/* ✅ Mobile: Jika lebih dari 30 karakter, truncate */}
                      <span
                        className="inline md:hidden truncate max-w-[300px]"
                        title={item.destination_url}
                      >
                        {item.destination_url.length > 50
                          ? `${item.destination_url.substring(0, 50)}...`
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
                  <div className="flex items-center gap-1">
                    {item.tags
                      .slice(0, 2)
                      .map((tag: { id: number; name: string }) => (
                        <span
                          key={tag.id}
                          className="px-2 py-1 text-xs font-medium text-black bg-lime-500 rounded-md"
                        >
                          {tag.name}
                        </span>
                      ))}

                    {/* ✅ If more than 2 tags exist, show "+X" */}
                    {item.tags?.length > 2 && (
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
                    width={16} // Sesuaikan ukuran
                    height={16}
                    className="w-4 h-4"
                  />
                  {Number(item.clicks).toLocaleString("en-US")} clicks
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
                    <DropdownMenuItem
                      onClick={() => handleCopy(item.short_link)}
                    >
                      Copy Link ID
                    </DropdownMenuItem>
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
