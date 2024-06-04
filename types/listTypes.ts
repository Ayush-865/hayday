export interface ListData {
  listName: string;
  farmLevel: string;
  items: Object[];
}

export interface AddListProps {
  setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface UpdateListProps {
  listName: string;
  farmLevel: string;
  setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface DeleteListProps {
  listName: string;
  setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
