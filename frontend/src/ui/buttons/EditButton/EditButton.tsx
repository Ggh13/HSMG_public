import { FC } from "react";
import { Link } from "react-router-dom";
import edit from '@/ui/imgs/edit.svg';

interface EditButtonProps {
    link: string;
}
export const EditButton: FC<EditButtonProps> = ({ link }) => {
    return (
        <Link to={link}>
            <img src={edit} sizes={"25"} />
        </Link>
    )
}