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
}

export const ComboBoxForTags: React.FC<ComboBoxForTagsProps> = ({ dataTags }) => {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedTag, setSelectedTag] = React.useState<Tag | null>(null);

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            {selectedTag ? <>{selectedTag.name}</> : <><Tags /> Tags</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" align="start">
          <TagList setOpen={setOpen} setSelectedTag={setSelectedTag} dataTags={dataTags} />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-start">
          {selectedTag ? <>{selectedTag.name}</> : <>+ Tags</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <TagList setOpen={setOpen} setSelectedTag={setSelectedTag} dataTags={dataTags} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

// ✅ Komponen daftar tag (TagList)
function TagList({
  setOpen,
  setSelectedTag,
  dataTags,
}: {
  setOpen: (open: boolean) => void;
  setSelectedTag: (tag: Tag | null) => void;
  dataTags: Tag[];
}) {

  console.log(dataTags && dataTags);

  return (
    <Command>
      <CommandInput placeholder="Search tags..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {dataTags && dataTags.length === 0 ? (
            <CommandItem disabled>No tags available</CommandItem>
          ) : (
           dataTags && dataTags?.map((tag) => (
              <CommandItem
                key={tag.id}
                value={tag.name.toString()}
                onSelect={() => {
                  setSelectedTag(tag); // ✅ Memilih tag berdasarkan `tag` bukan `priority`
                  setOpen(false);
                }}
              >
                {tag.name}
              </CommandItem>
            ))
          )}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
