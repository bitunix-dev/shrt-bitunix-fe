"use client";

import * as React from "react";
import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tags, X } from "lucide-react";

// ✅ Definisikan TypeScript untuk `Tag`
interface Tag {
  id: number;
  name: string;
}

interface ComboBoxForTagsProps {
  dataTags: Tag[];
  selectedTags: string[]; // ✅ Sekarang hanya menyimpan string (nama tag)
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
}

export const ComboBoxForTags: React.FC<ComboBoxForTagsProps> = ({
  dataTags,
  selectedTags,
  setSelectedTags,
}) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(""); // ✅ Menyimpan input manual
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // ✅ Menampilkan tag yang sudah dipilih di dalam button
  const renderSelectedTags = () => {
    if (selectedTags.length === 0) {
      return (
        <>
          <Tags className="w-4" /> Tags
        </>
      );
    }
    return selectedTags.map((tag) => (
      <span
        key={tag}
        className="bg-gray-200 text-neutral-800 px-2 py-1 rounded text-sm mr-1 flex items-center"
      >
        {tag}
        <button
          className="ml-1 text-gray-500 hover:text-black"
          onClick={(e) => {
            e.stopPropagation(); // Prevent popover closing
            removeTag(tag);
          }}
        >
          <X className="w-3 h-3" />
        </button>
      </span>
    ));
  };

  // ✅ Fungsi untuk menghapus tag yang dipilih
  const removeTag = (tagToRemove: string) => {
    setSelectedTags((prevTags) =>
      prevTags.filter((tag) => tag !== tagToRemove)
    );
  };

  // ✅ Menangani input manual
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // ✅ Menambahkan tag baru saat user mengetik & menekan `Enter` atau `,`
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (newTag && !selectedTags.includes(newTag)) {
        setSelectedTags([...selectedTags, newTag]);
      }
      setInputValue(""); // Reset input field
    }
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
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            dataTags={dataTags}
            inputValue={inputValue}
            handleInputChange={handleInputChange}
            handleInputKeyDown={handleInputKeyDown}
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
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            dataTags={dataTags}
            inputValue={inputValue}
            handleInputChange={handleInputChange}
            handleInputKeyDown={handleInputKeyDown}
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
  inputValue,
  handleInputChange,
  handleInputKeyDown,
}: {
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
  dataTags: Tag[];
  inputValue: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
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
      <CommandInput
        placeholder="Search or add tags..."
        ref={(inputRef) => {
          if (inputRef) {
            inputRef.value = inputValue; // ✅ Sync value manually
            inputRef.oninput = (e: Event) => {
              handleInputChange(
                e as unknown as React.ChangeEvent<HTMLInputElement>
              );
            };
            inputRef.onkeydown = (e: KeyboardEvent) => {
              handleInputKeyDown(
                e as unknown as React.KeyboardEvent<HTMLInputElement>
              );
            };
          }
        }}
      />

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
