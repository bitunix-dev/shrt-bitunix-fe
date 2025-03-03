"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";
import {
  Copy,
  ExternalLink,
  MoreHorizontal,
  Pencil,
  QrCode,
  CopyCheck,
  Trash2,
  Archive,
  FolderUp,
  Files,
  ChevronDown,
  Search,
} from "lucide-react";

import CreateLinkModal from "../ModalDialog/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// API URL dari .env.local
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function DataTable() {
  const [data, setData] = React.useState([]);

  // Fetch data dari API saat komponen dimount
  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${API_URL}/api/urls`);
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  // Kolom tabel
  const columns: ColumnDef<(typeof data)[0]>[] = [
    {
      accessorKey: "short_link",
      header: () => null,
      cell: ({ row }) => (
        <div className="flex items-center gap-3 py-3">
          {/* Status Icon */}
          <div className="w-4 h-4 rounded-full bg-green-400"></div>

          {/* Short Link */}
          <div className="flex items-center gap-2">
            <span className="text-black font-medium">
              {row.getValue("short_link")}
            </span>
            <button
              className="text-gray-500 hover:text-black"
              onClick={() =>
                navigator.clipboard.writeText(row.getValue("short_link"))
              }
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "destination_url",
      header: () => null,
      cell: ({ row }) => (
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <span className="truncate">{row.getValue("destination_url")}</span>
          <a
            href={row.getValue("destination_url")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="w-4 h-4 text-gray-500 hover:text-black" />
          </a>
        </div>
      ),
    },
    {
      accessorKey: "clicks",
      header: () => null,
      cell: ({ row }) => (
        <Button
          variant="ghost"
          className="text-sm text-gray-600 px-3 py-1 border border-gray-300 rounded-md"
        >
          ✨ {row.getValue("clicks")} clicks
        </Button>
      ),
    },
    {
      accessorKey: "tags",
      header: () => null,
      cell: ({ row }) => (
        <div className="flex gap-1 text-gray-500 text-xs">
          {((row.getValue("tags") as any[]) || []).map((tag) => (
            <span key={tag.id} className="px-2 py-1 bg-gray-200 rounded-md">
              {tag.name}
            </span>
          ))}
        </div>
      ),
    },
    {
      id: "actions",
      header: () => null,
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Pencil className="w-4 h-4 mr-2" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <QrCode className="w-4 h-4 mr-2" /> QR Code
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Files className="w-4 h-4 mr-2" /> Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CopyCheck className="w-4 h-4 mr-2" /> Copy Link ID
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Archive className="w-4 h-4 mr-2" /> Archive
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FolderUp className="w-4 h-4 mr-2" /> Transfer
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <Trash2 className="w-4 h-4 mr-2" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  // Inisialisasi tabel
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="w-full">
      {/* HEADER */}
      <div className="flex items-center justify-between py-4">
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Filter <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Status: Active</DropdownMenuItem>
              <DropdownMenuItem>Status: Expired</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Display <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Show all columns</DropdownMenuItem>
              <DropdownMenuItem>Customize columns</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 text-gray-500 w-4 h-4" />
            <Input placeholder="Search..." className="pl-8 max-w-sm" />
          </div>

          <CreateLinkModal />
        </div>
      </div>

      {/* TABLE */}
      <div className="w-full">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} className="border rounded-lg">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
