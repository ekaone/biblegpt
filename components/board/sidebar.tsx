import React, { useState } from "react";
import Image from "next/image";
import {
  Home,
  Bookmark,
  TrendingUp,
  Users,
  Settings,
  ShoppingBag,
} from "lucide-react";
import NavigationItem from "./navigation-item";

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  // In a real app, this would be managed with state/context
  const [activeNav, setActiveNav] = useState<
    "home" | "library" | "progress" | "friends" | "settings"
  >("home");

  const handleNavClick = (
    nav: "home" | "library" | "progress" | "friends" | "settings"
  ) => {
    setActiveNav(nav);
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="flex flex-col justify-between h-screen py-6 bg-[#f8f3ef] w-20">
      <div className="flex flex-col items-center space-y-2">
        <div className="w-12 h-12 flex items-center justify-center mb-4">
          <div className="w-8 h-8 bg-black rounded-sm flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-white" />
          </div>
        </div>

        <NavigationItem
          icon={Home}
          active={activeNav === "home"}
          onClick={() => handleNavClick("home")}
        />
        <NavigationItem
          icon={Bookmark}
          active={activeNav === "library"}
          onClick={() => handleNavClick("library")}
        />
        <NavigationItem
          icon={TrendingUp}
          active={activeNav === "progress"}
          onClick={() => handleNavClick("progress")}
        />
        <NavigationItem
          icon={Users}
          active={activeNav === "friends"}
          onClick={() => handleNavClick("friends")}
        />
      </div>

      <div className="flex flex-col items-center">
        <NavigationItem
          icon={Settings}
          active={activeNav === "settings"}
          onClick={() => handleNavClick("settings")}
        />
        <div className="w-10 h-10 rounded-full overflow-hidden mt-4 border-2 border-[#f8f3ef]">
          <Image
            src="https://randomuser.me/api/portraits/women/65.jpg"
            alt="User profile"
            className="w-full h-full object-cover"
            width={20}
            height={20}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
