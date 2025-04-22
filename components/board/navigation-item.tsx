import React from "react";
// import { DivideIcon as LucideIcon } from "lucide-react";

interface NavigationItemProps {
  icon: React.ComponentType<{ size?: number }>;
  active?: boolean;
  onClick?: () => void;
}

const NavigationItem: React.FC<NavigationItemProps> = ({
  icon: Icon,
  active = false,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200 ${
        active ? "bg-black text-white" : "text-black hover:bg-black/5"
      }`}
    >
      <Icon size={20} />
    </button>
  );
};

export default NavigationItem;
