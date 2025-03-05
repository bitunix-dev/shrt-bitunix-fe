"use client";

import * as React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tags } from "lucide-react";

// ✅ Definisikan TypeScript untuk `Tag`
interface Tag {
  id: number;
  name: string;
}

interface ComboBoxForTagsProps {
  dataTags: Tag[]; // ✅ Gunakan array dengan tipe `Tag`
  selectedTags: string[]; // ✅ Sekarang hanya menyimpan nama tag
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>; // ✅ Setter untuk array string
}

export const ComboBoxForTags: React.FC<ComboBoxForTagsProps> = ({
  dataTags,
  selectedTags,
  setSelectedTags,
}) => {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // ✅ Menampilkan tag yang sudah dipilih di dalam button
  const renderSelectedTags = () => {
    if (selectedTags.length === 0) return <><Tags className="w-4" /> Tags</>;
    return selectedTags.map((tag) => (
      <span key={tag} className="bg-gray-200 px-2 py-1 rounded text-sm mr-1">
        {tag}
      </span>
    ));
  };

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="w-full flex border text-sm py-1.5 px-2 rounded-md items-start flex-wrap gap-1">
            {renderSelectedTags()}
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-0" align="start">
          <TagList
            setOpen={setOpen}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            dataTags={dataTags}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div className="w-full flex border text-sm py-1.5 px-2 rounded-md items-start flex-wrap gap-1">
          {renderSelectedTags()}
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <TagList
            setOpen={setOpen}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            dataTags={dataTags}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

// ✅ Komponen daftar tag (TagList)
function TagList({
  selectedTags,
  setSelectedTags,
  dataTags,
}: {
  setOpen: (open: boolean) => void;
  selectedTags: string[]; // ✅ Sekarang hanya menyimpan string
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
  dataTags: Tag[];
}) {
  // ✅ Fungsi untuk menambah/menghapus tag dari daftar pilihan
  const toggleTagSelection = (tag: Tag) => {
    setSelectedTags((prevTags) => {
      if (prevTags.includes(tag.name)) {
        return prevTags.filter((t) => t !== tag.name); // Hapus jika sudah ada
      } else {
        return [...prevTags, tag.name]; // Tambahkan jika belum ada
      }
    });
  };

  return (
    <Command>
      <CommandInput placeholder="Search tags..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {dataTags.length === 0 ? (
            <CommandItem disabled>No tags available</CommandItem>
          ) : (
            dataTags.map((tag) => (
              <CommandItem
                key={tag.id}
                value={tag.name}
                onSelect={() => toggleTagSelection(tag)}
              >
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag.name)}
                  className="mr-2"
                  readOnly
                />
                {tag.name}
              </CommandItem>
            ))
          )}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
