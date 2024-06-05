"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { items } from "@/data/items";
import useActiveList from "@/store/activeList";
import useListData from "@/store/listData";
import { SelectItemProps, SelectedItem } from "@/types/listTypes";

export function SelectProduct({
  selectedItem,
  setSelectedItem,
  quantityRef,
  defaultMultiplier,
}: SelectItemProps) {
  const [open, setOpen] = React.useState(false);
  const { activeList } = useActiveList();
  const { listData } = useListData();

  const farmLevel = Number(
    listData.find((list) => list.listName === activeList)?.farmLevel
  );

  const filteredItems: SelectedItem[] = Object.entries(items)
    .filter(([itemName, itemValues]) => {
      const level = Number(itemValues[0]);
      return level <= farmLevel;
    })
    .map(([itemName, itemValues]) => ({
      name: itemName,
      price: Number(itemValues[1]),
      type: String(itemValues[3]),
      quantity: null,
      multiplier:
        String(itemValues[3]) === "product" ? Number(defaultMultiplier) : 1,
    }));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-black border-2 rounded-md py-[27px] px-0 w-full hover:bg-themebackground"
        >
          {selectedItem?.name !== null ? (
            <div className="flex items-center justify-start gap-2">
              {selectedItem?.name && (
                <img
                  src={`assets/${
                    items[selectedItem.name as keyof typeof items]?.[2]
                  }.webp`}
                  alt={selectedItem.name}
                  width={50}
                  height={50}
                />
              )}
              <span>
                {selectedItem?.name?.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                  letter.toUpperCase()
                )}
              </span>
            </div>
          ) : (
            <>Select Item</>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" side="bottom" align="start">
        <Command>
          <CommandInput placeholder="Enter Item name" />
          <CommandList>
            <CommandEmpty>No Items found.</CommandEmpty>
            <CommandGroup>
              {filteredItems.map((item) => (
                <CommandItem
                  key={item.name}
                  value={item.name ?? ""}
                  onSelect={() => {
                    setSelectedItem(item);
                    setOpen(false);
                    quantityRef.current?.focus();
                  }}
                  className="flex items-center gap-2 p-2 cursor-pointer"
                >
                  <img
                    src={`assets/${
                      items[item.name as keyof typeof items]?.[2]
                    }.webp`}
                    alt={item.name ?? ""}
                    width={50}
                    height={50}
                  />
                  <span>
                    {item.name?.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                      letter.toUpperCase()
                    )}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
