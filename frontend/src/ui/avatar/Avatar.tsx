import { FC } from "react";
import { img } from "@/ui/basic_imgs/img";
interface AvatarProps {
  src: string;
  size: number;
}

export const Avatar: FC<AvatarProps> = ({ src, size}) => {
  if (!src) {
    src = img;
  }
  return (
    <img
      src={`data:image/gif;base64,${src}`}
      alt="Аватар"
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        objectFit: "cover",
      }}
    />
  )
}