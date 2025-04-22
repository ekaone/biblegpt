import React, { ReactNode, useState } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "@/components/board/sidebar";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden relative">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-full bg-white shadow-lg"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Main navigation sidebar */}
      <div
        className={`
        fixed lg:relative lg:translate-x-0 transition-transform duration-300 z-40
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto px-4 lg:px-10 py-8 pt-16 lg:pt-8">
        <div className="max-w-4xl mx-auto">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
