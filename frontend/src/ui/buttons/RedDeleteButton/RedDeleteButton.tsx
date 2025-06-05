import { FC } from "react";
import del from '@/ui/imgs/Red_delete.svg'

interface RedDeleteButtonProps{
    onClick: () => void;
}

export const RedDeleteButton: FC<RedDeleteButtonProps> = ({onClick}) => {
    return <img src={del} sizes={'25'} onClick={onClick}/>;
}