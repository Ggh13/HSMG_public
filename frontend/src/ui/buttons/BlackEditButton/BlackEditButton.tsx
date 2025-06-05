import { FC } from "react";
import { Link } from "react-router-dom";
import blackedit from '@/ui/imgs/edit_black.svg';

interface BlackEditButtonProps {
    link: string;
}
export const BlackEditButton: FC<BlackEditButtonProps> = ({ link }) => {
    return (
        <Link to={link}>
            <img src={blackedit} sizes={"25"} />
        </Link>
    )
}