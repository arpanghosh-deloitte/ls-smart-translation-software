import type { ReactNode } from "react";
import Header from "../theme/Header";


type Props = {
  children: ReactNode;
};

const GlobalLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      {children}
   
    </>
  );
};

export default GlobalLayout;
