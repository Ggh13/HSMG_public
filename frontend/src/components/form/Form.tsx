import { FC, FormEvent, ReactNode } from "react";


interface FormProps {
  children: ReactNode;
  onSubmit: () => void;
  className?: string;
}

export const Form: FC<FormProps> = ({ children, onSubmit}) => {

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  }

  return (
    <form onSubmit={handleSubmit} className="">
      {children}
    </form>
  )
}