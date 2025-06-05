import { FC } from "react";
import clearSearchBar from "@/ui/imgs/clearSearchBar.svg"; 

interface ClearInputButtonProps {
  value: string;
  onClear: () => void;
}


export const ClearInputButton: FC<ClearInputButtonProps> = ({ value, onClear }) => {
  if (!value) return null;

  return (
    <button onClick={onClear} style={{ background: "none", border: "none" }}>
      <img src={clearSearchBar} alt="Назад" />
    </button>
  )
}