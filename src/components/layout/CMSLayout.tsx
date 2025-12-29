import { ReactNode } from "react";
import CMSSidebar from "./CMSSidebar";
import CMSTopBar from "./CMSTopBar";

interface CMSLayoutProps {
  children: ReactNode;
}

const CMSLayout = ({ children }: CMSLayoutProps) => {
  return (
    <div className="flex h-screen bg-surface-sunken overflow-hidden">
      <CMSSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <CMSTopBar />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default CMSLayout;
