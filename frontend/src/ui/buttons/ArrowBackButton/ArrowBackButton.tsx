import { FC } from "react";
import blackArrow from "@/ui/imgs/blackArrow.svg";
import { Link } from "react-router-dom";

interface ArrowBackButtonProps {
  src: string;
}

export const ArrowBackButton: FC<ArrowBackButtonProps> = ({ src }) => {
  return (
    <Link to={src}>
      <img src={blackArrow} alt="Назад" />
    </Link>
  );
};
