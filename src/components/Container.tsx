import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return <div className="flex h-screen">{children}</div>;
};

export default Container;
