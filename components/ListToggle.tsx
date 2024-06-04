"use client";
import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import useActiveList from "@/store/activeList";
import useListData from "@/store/listData";
import {
  AddListProps,
  DeleteListProps,
  ListData,
  UpdateListProps,
} from "@/types/listTypes";

export function ListToggle() {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const { activeList, setActiveList } = useActiveList();
  const { listData, setListData } = useListData();

  React.useEffect(() => {
    if (activeList != null) localStorage.setItem("activeList", activeList);
  }, [activeList]);

  React.useEffect(() => {
    localStorage.setItem("listData", JSON.stringify(listData));
  }, [listData]);

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <div className="border-black border-2 rounded-md p-2 w-full hover:bg-themebackground">
          {activeList === null ? "Select a List" : activeList}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col items-center">
        {listData?.map((list) => (
          <React.Fragment key={list.listName}>
            <div className="flex items-center gap-1 py-1 px-2 hover:bg-themebackground rounded-md">
              <span
                onClick={() => {
                  setActiveList(list.listName);
                  setDropdownOpen(false);
                }}
                className="text-md mr-5"
              >
                {list.listName}-{list.farmLevel}
              </span>
              <UpdateList
                listName={list.listName}
                farmLevel={list.farmLevel}
                setDropdownOpen={setDropdownOpen}
              />
              <DeleteList
                listName={list.listName}
                setDropdownOpen={setDropdownOpen}
              />
            </div>
          </React.Fragment>
        ))}
        <DropdownMenuSeparator />
        <AddList setDropdownOpen={setDropdownOpen} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ListToggle;

function AddList({ setDropdownOpen }: AddListProps) {
  const { setActiveList } = useActiveList();
  const { listData, setListData } = useListData();
  const [listName, setListName] = React.useState<string>("");
  const [farmLevel, setFarmLevel] = React.useState<string>("");
  const [isOpen, setIsOpen] = React.useState(false);

  const addList = () => {
    if (!listName) {
      toast.error("Please enter a list name.");
      return;
    }

    if (!farmLevel) {
      toast.error("Please enter a farm level.");
      return;
    }

    const isDuplicateName = listData.some(
      (list: ListData) => list.listName === listName
    );
    if (isDuplicateName) {
      toast.error("List name already exists. Please enter a unique name.");
      return;
    }

    const newList: ListData = {
      listName: listName,
      farmLevel: farmLevel,
      items: [],
    };

    const updatedListData = [...listData, newList];
    setListData(updatedListData);
    setListName("");
    setFarmLevel("");
    setActiveList(listName);
    setIsOpen(false);
    setDropdownOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button variant="default">Create New List</Button>
      </DialogTrigger>
      <DialogContent className="rounded-2xl bg-themeforeground px-5 md:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Create List</DialogTitle>
          <DialogDescription>
            Create a New List and manage your Hay Day products.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 py-1">
          <div className="flex items-center gap-2">
            <Label htmlFor="name" className="text-center w-[150px]">
              List Name
            </Label>
            <Input
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              className="flex-grow"
              placeholder="Enter list name"
              autoComplete="off"
            />
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="name" className="text-center w-[150px]">
              Farm Level
            </Label>
            <Input
              value={farmLevel}
              onChange={(e) => setFarmLevel(e.target.value)}
              type="number"
              className="flex-grow"
              placeholder="Enter Farm Level"
              autoComplete="off"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={addList}>
            Save List
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function UpdateList({ setDropdownOpen, listName, farmLevel }: UpdateListProps) {
  const { activeList, setActiveList } = useActiveList();
  const { listData, setListData } = useListData();

  const [updatedListName, setUpdatedListName] =
    React.useState<string>(listName);
  const [updatedFarmLevel, setUpdatedFarmLevel] =
    React.useState<string>(farmLevel);
  const [isOpen, setIsOpen] = React.useState(false);

  const updateList = () => {
    if (!updatedListName) {
      toast.error("Please enter a list name.");
      return;
    }

    if (!updatedFarmLevel) {
      toast.error("Please enter a farm level.");
      return;
    }

    const isDuplicateName = listData.some(
      (list) => list.listName === updatedListName && list.listName !== listName
    );
    if (isDuplicateName) {
      toast.error("List name already exists. Please enter a unique name.");
      return;
    }

    let updatedListData = [...listData];
    updatedListData = updatedListData.map((list) => {
      if (list.listName === listName) {
        return {
          ...list,
          listName: updatedListName,
          farmLevel: updatedFarmLevel,
        };
      }
      return list;
    });

    setListData(updatedListData);
    setUpdatedFarmLevel("");
    setUpdatedListName("");
    if (activeList === listName) setActiveList(updatedListName);
    setIsOpen(false);
    setDropdownOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button variant="outline">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-2xl bg-themeforeground px-5 md:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Update List</DialogTitle>
          <DialogDescription>
            Update your list and manage your Hay Day products.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 py-1">
          <div className="flex items-center gap-2">
            <Label htmlFor="name" className="text-center w-[150px]">
              List Name
            </Label>
            <Input
              value={updatedListName}
              onChange={(e) => setUpdatedListName(e.target.value)}
              className="flex-grow"
              placeholder="Enter list name"
              autoComplete="off"
            />
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="name" className="text-center w-[150px]">
              Farm Level
            </Label>
            <Input
              value={updatedFarmLevel}
              onChange={(e) => setUpdatedFarmLevel(e.target.value)}
              type="number"
              className="flex-grow"
              placeholder="Enter Farm Level"
              autoComplete="off"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={updateList}>
            Update List
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function DeleteList({ listName, setDropdownOpen }: DeleteListProps) {
  const { activeList, setActiveList } = useActiveList();
  const { listData, setListData } = useListData();
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">
            <Trash2 />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Are you sure you want to delete this
              list?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive"
              onClick={() => {
                const updatedListData = listData.filter(
                  (list) => list.listName !== listName
                );
                setListData(updatedListData);
                if (activeList === listName) setActiveList(null);
                setDropdownOpen(false);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
