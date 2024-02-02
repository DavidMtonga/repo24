import { ReactNode } from "react";
import Navbar from "../Navbar";

interface Props {
  children: ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="mx-auto max-w-7xl w-full items-center justify-center flex flex-col">
      <Navbar />
      <main className="w-full">{children}</main>
    </div>
  );
};

export default Layout;
