"use client";

import * as React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Data {
  id: string;
  name: string;
}

interface ComboBoxProps {
  data: Data[];
  selectedData: string;
  setSelectedData: (val: string) => void;
  label: string;
  icon: React.ReactNode;
}

export const ComboBoxComponents: React.FC<ComboBoxProps> = ({
  data,
  selectedData,
  setSelectedData,
  label,
  icon,
}) => {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const displayValue = selectedData || (
    <span className="text-muted-foreground flex items-center gap-1">
      {icon} {label}
    </span>
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmed = inputValue.trim();
      if (!trimmed) return;

      setSelectedData(trimmed);
      setInputValue("");
      setOpen(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="w-full border text-sm py-1.5 px-2 rounded-md cursor-pointer flex items-center justify-between">
          {displayValue}
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-full">
        <Command>
          <div className="p-2">
            <CommandInput
              ref={inputRef}
              placeholder="Search or add..."
              onKeyDown={handleKeyDown}
              onInput={(e) => {
                const target = e.target as HTMLInputElement;
                setInputValue(target.value);
              }}
            />
          </div>

          <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {data.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.name}
                  onSelect={() => {
                    setSelectedData(item.name);
                    setInputValue("");
                    setOpen(false);
                  }}
                >
                  {item.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
