"use client";

import * as React from "react";
import {
  Copy,
  ExternalLink,
  MoreHorizontal,
  Pencil,
  QrCode,
  CopyCheck,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Header } from "./Header";

interface DataTableProps {
  BtnCreate: React.ReactNode;
  data: any;
}

export const DataTable: React.FC<DataTableProps> = ({ BtnCreate, data }) => {
  const [selectedItem, setSelectedItem] = React.useState<any>(null);

  return (
    <div className="w-full">
      {/* HEADER */}
      <Header BtnCreate={BtnCreate} />

      {/* LIST VIEW */}
      <div className="mt-4 space-y-2">
        {data && data.length ? (
          data.map((item: any, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border"
            >
              <div className="flex items-center gap-4">
                {/* Status Indicator */}
                <div className="w-6 h-6 rounded-full bg-green-400"></div>
                
                {/* Link Info */}
                <div>
                  <div className="flex items-center gap-2 text-lg font-semibold">
                    {item.short_link}
                    <button
                      className="text-gray-500 hover:text-black"
                      onClick={() => navigator.clipboard.writeText(item.short_link)}
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-gray-500 text-sm">
                    <a
                      href={item.destination_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1"
                    >
                      ↳ {item.destination_url}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <span className="text-xs text-gray-400"> • {item.time_ago}</span>
                  </div>
                </div>
              </div>
              
              {/* Tags & Clicks */}
              <div className="flex items-center gap-2">
                {item.tags?.length > 0 && (
                  <span className="px-2 py-1 text-xs font-medium text-purple-600 bg-purple-100 rounded-md">
                    {item.tags[0].name}
                  </span>
                )}
                <span className="text-sm text-gray-600 px-3 py-1 border border-gray-300 rounded-md">
                  ✨ {item.clicks} clicks
                </span>
                
                {/* Actions */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setSelectedItem(item)}>Edit</DropdownMenuItem>
                    <DropdownMenuItem>QR Code</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    <DropdownMenuItem>Copy Link ID</DropdownMenuItem>
                    <DropdownMenuItem>Archive</DropdownMenuItem>
                    <DropdownMenuItem>Transfer</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No results.</p>
        )}
      </div>

      {/* Modal for Editing */}
      {selectedItem && (
        <Dialog open={Boolean(selectedItem)} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Link</DialogTitle>
              <DialogDescription>
                Modify the short link details.
              </DialogDescription>
            </DialogHeader>
            <div className="p-4">
              <p className="text-lg font-semibold">{selectedItem.short_link}</p>
              <p className="text-sm text-gray-500">Destination: {selectedItem.destination_url}</p>
            </div>
            <Button onClick={() => setSelectedItem(null)}>Close</Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};