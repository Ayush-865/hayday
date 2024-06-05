export interface SelectedItem {
  name: string | null;
  price: number | null;
  quantity: number | null;
  multiplier: number | null;
  type: string | null;
}

export interface SelectItemProps {
  defaultMultiplier: string;
  selectedItem: SelectedItem | null;
  setSelectedItem: React.Dispatch<React.SetStateAction<SelectedItem | null>>;
  quantityRef: React.RefObject<HTMLInputElement>;
}

export interface ListData {
  listName: string;
  farmLevel: number;
  items: SelectedItem[];
}

export interface AddListProps {
  setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface UpdateListProps {
  listName: string;
  farmLevel: number;
  setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface DeleteListProps {
  listName: string;
  setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
