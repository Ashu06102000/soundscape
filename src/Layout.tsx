import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex bg-white w-screen m-1 rounded-l-[30px] p-4">
      {children}
    </div>
  );
};
export default Layout;
