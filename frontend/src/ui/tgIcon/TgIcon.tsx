import { FC } from "react";
import tg from "@/ui/imgs/tg.svg";
interface TgIconProps {
  size: number;
}

export const TgIcon: FC<TgIconProps> = ({size}) => {
  return (
    <img
      src={tg}
      alt="Телеграмм"
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        objectFit: "cover",
      }}
    />
  )
}