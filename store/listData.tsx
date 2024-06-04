import { create } from "zustand";
import { ListData } from "@/types/listTypes";

type ListDataState = {
  listData: ListData[];
  setListData: (data: ListData[]) => void;
};

const useListData = create<ListDataState>((set) => {
  let storedListData = localStorage.getItem("listData");
  let initialListData: ListData[] = [];
  if (storedListData) {
    try {
      initialListData = JSON.parse(storedListData);
    } catch (error) {
      localStorage.setItem("listData", JSON.stringify(initialListData));
    }
  }

  return {
    listData: initialListData,
    setListData: (data: ListData[]) => {
      localStorage.setItem("listData", JSON.stringify(data)); // Persist to localStorage
      set({ listData: data });
    },
  };
});

export default useListData;
