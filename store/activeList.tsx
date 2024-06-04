import { create } from "zustand";

type ActiveListState = {
  activeList: string | null;
  setActiveList: (list: string | null) => void;
};

const useActiveList = create<ActiveListState>((set) => {
  const storedList = localStorage.getItem("activeList");
  const initialActiveList = storedList !== null ? storedList : null;

  return {
    activeList: initialActiveList,
    setActiveList: (list: string | null) => {
      if (list !== null) {
        localStorage.setItem("activeList", list);
      } else {
        localStorage.removeItem("activeList");
      }
      set({ activeList: list });
    },
  };
});

export default useActiveList;
