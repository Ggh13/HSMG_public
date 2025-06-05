import { FC } from "react";
import { img } from "../basic_imgs/img";
interface Training_Img_Props {
  src: string;
}

export const Training_Img: FC<Training_Img_Props> = ({ src}) => {
  if (!src) {
    src = img;
  }
  return (
    <img
      src={`data:image/gif;base64,${src}`}
      alt="Картинка тренировки"
      style={{
        width: "100%",
        height: "200px",
        borderRadius: "30px",
        objectFit: "cover",
      }}
    />
  )
}