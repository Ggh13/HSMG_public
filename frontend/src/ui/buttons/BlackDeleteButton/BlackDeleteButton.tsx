import { FC } from 'react';
import del from '@/ui/imgs/delete.svg';

interface BlackDeleteButtonProps {
  onClick: () => void;
}

export const BlackDeleteButton: FC<BlackDeleteButtonProps> = ({ onClick }) => {
  return <img src={del} sizes={'25'} onClick={onClick} />;
};
