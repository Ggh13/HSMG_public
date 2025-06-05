import { FC } from "react";
import { useNavigate } from "react-router-dom";
import BackButtonIcon from "@/ui/imgs/GoBackButton.svg";

interface BackButtonProps {
  onClick?: () => void;
}

export const BackButton: FC<BackButtonProps> = ({ onClick }) => {
  const navigate = useNavigate();


  return (
    <button type="button" onClick={onClick ? onClick : () => navigate(-1)} style={{ background: "none", border: "none" }}>
      <img src={BackButtonIcon} alt="Назад" />
    </button>
  )
}