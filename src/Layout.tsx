import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex bg-slate-50 w-screen m-1 rounded-l-[30px] p-10">
      {children}
    </div>
  );
};
export default Layout;
