"use client";
import ListToggle from "@/components/ListToggle";
import { SelectProduct } from "@/components/SelectProduct";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { items } from "@/data/items";
import useActiveList from "@/store/activeList";
import useListData from "@/store/listData";
import { SelectedItem } from "@/types/listTypes";
import React from "react";
import { toast } from "sonner";

const Options = () => {
  const { listData, setListData } = useListData();
  const { activeList } = useActiveList();
  const quantityRef = React.useRef<HTMLInputElement>(null);

  const [defaultMultiplier, setDefaultMultiplier] = React.useState<string>(
    () => {
      const mul = localStorage.getItem("defaultMultiplier");
      return mul ? mul : "5";
    }
  );

  const [selectedItem, setSelectedItem] = React.useState<SelectedItem | null>({
    name: null,
    quantity: null,
    multiplier: null,
    price: null,
    type: null,
  });

  React.useEffect(() => {
    type ItemKeys = keyof typeof items;
    if (selectedItem) {
      const key = selectedItem.name as ItemKeys;
      if (selectedItem?.price && selectedItem.price > Number(items[key][1])) {
        setSelectedItem((prev) => ({
          ...prev,
          price: Number(items[key][1]),
          name: prev?.name ?? null,
          quantity: prev?.quantity ?? null,
          multiplier: prev?.multiplier ?? null,
          type: prev?.type ?? null,
        }));
        toast.error("Price cannot be greater than the maximum server price");
      }
    }
  }, [selectedItem?.price]);

  const addItem = () => {
    if (!selectedItem?.name) {
      toast.error("Please select an item to add");
      return;
    }
    if (!selectedItem?.quantity) {
      toast.error("Please enter quantity to add");
      return;
    }
    if (selectedItem?.type === "product" && !selectedItem?.multiplier) {
      toast.error("Please select multiplier to add");
      return;
    }
    if (
      (selectedItem?.type === "crop" || selectedItem?.type === "tool") &&
      !selectedItem?.price
    ) {
      toast.error("Please enter price to add");
      return;
    }

    const newList = [...listData];
    const index = newList.findIndex((list) => list.listName === activeList);
    if (index !== -1) {
      if (
        newList[index].items.some((item) => item.name === selectedItem.name)
      ) {
        toast.error("Item already exists in the list");
        setSelectedItem({
          name: null,
          quantity: null,
          multiplier: null,
          price: null,
          type: null,
        });
        return;
      }
      newList[index].items.push(selectedItem);
      setListData(newList);
      setSelectedItem({
        name: null,
        quantity: null,
        multiplier: null,
        price: null,
        type: null,
      });
      toast.success("Item Added Successfully");
    } else {
      toast.error("No list found to add item");
    }
  };

  const changeDefaultMultiplier = (value: string) => {
    setSelectedItem((prev) => ({
      ...prev,
      multiplier: parseInt(value),
      name: prev?.name ?? null,
      quantity: prev?.quantity ?? null,
      price: prev?.price ?? null,
      type: prev?.type ?? null,
    }));
    setDefaultMultiplier(value);
    localStorage.setItem("defaultMultiplier", value);
  };

  return (
    <div className="flex flex-col gap-3 py-1shadow-lg rounded-md p-5 bg-themeforeground">
      <div className="flex items-center gap-2">
        <Label htmlFor="name" className="text-center w-[100px] md:w-[150px]">
          Select List
        </Label>
        <ListToggle />
      </div>
      <hr className="border-[1.5px]" />
      <Label htmlFor="name" className="text-center w-full text-lg">
        Add Items
      </Label>
      <div className="flex items-center gap-2">
        <Label htmlFor="name" className="text-center  w-[100px] md:w-[150px]">
          Name
        </Label>
        <SelectProduct
          defaultMultiplier={defaultMultiplier}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          quantityRef={quantityRef}
        />
      </div>
      <div className="flex items-center gap-2">
        <Label htmlFor="name" className="text-center  w-[100px] md:w-[150px]">
          Quantity
        </Label>
        <Input
          ref={quantityRef}
          value={selectedItem?.quantity ?? ""}
          onChange={(e) =>
            setSelectedItem((prev) => ({
              ...prev,
              quantity: parseInt(e.target.value),
              name: prev?.name ?? null,
              multiplier: prev?.multiplier ?? null,
              price: prev?.price ?? null,
              type: prev?.type ?? null,
            }))
          }
          type="number"
          className="flex-grow"
          placeholder="Enter product quantity"
          autoComplete="off"
        />
      </div>
      {selectedItem?.type === "product" && (
        <>
          <div className="flex items-center gap-2">
            <Label
              htmlFor="name"
              className="text-center  w-[100px] md:w-[150px]"
            >
              Multiplier
            </Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="border-black border-2 rounded-md p-2 w-full hover:bg-themebackground">
                  {defaultMultiplier !== null
                    ? defaultMultiplier + "x"
                    : "Select a Multiplier"}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => changeDefaultMultiplier("1")}>
                  1x
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeDefaultMultiplier("2")}>
                  2x
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeDefaultMultiplier("3")}>
                  3x
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeDefaultMultiplier("4")}>
                  4x
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeDefaultMultiplier("5")}>
                  5x
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      )}
      {(selectedItem?.type === "crop" || selectedItem?.type === "tool") && (
        <div className="flex items-center gap-2">
          <Label htmlFor="name" className="text-center  w-[100px] md:w-[150px]">
            Price
          </Label>
          <Input
            value={selectedItem?.price ?? ""}
            onChange={(e) =>
              setSelectedItem((prev) => ({
                ...prev,
                price: parseInt(e.target.value),
                name: prev?.name ?? null,
                quantity: prev?.quantity ?? null,
                multiplier: prev?.multiplier ?? null,
                type: prev?.type ?? null,
              }))
            }
            type="number"
            className="flex-grow"
            placeholder="Enter Price"
            autoComplete="off"
          />
        </div>
      )}
      <div className="flex items-center justify-around gap-2">
        <Button
          variant={"destructive"}
          className="w-1/2"
          onClick={() => {
            setSelectedItem({
              name: null,
              quantity: null,
              multiplier: null,
              price: null,
              type: null,
            });
            toast.success("Item Erased Successfully");
          }}
        >
          Delete
        </Button>
        <Button variant={"default"} className="w-1/2" onClick={addItem}>
          Add
        </Button>
      </div>
      <hr className="border-[1.5px]" />
      <div className="flex items-center justify-around gap-2">
        <Button variant={"outline"} className="w-1/2">
          Copy List
        </Button>
        <Button variant={"outline"} className="w-1/2">
          Download Image
        </Button>
      </div>
    </div>
  );
};

export default Options;
