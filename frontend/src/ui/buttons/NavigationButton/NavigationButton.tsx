import { FC } from "react";
import { Link } from "react-router-dom";
import go from "@/ui/imgs/go.svg";
interface NavigationButtonProps {
  link: string;
}

export const NavigationButton: FC<NavigationButtonProps> = ({link}) => {
  return (
    <Link to={link}>
      <img src={go} alt="" />
    </Link>
  )
}