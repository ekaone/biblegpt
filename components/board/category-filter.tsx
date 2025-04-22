import React from "react";
import { Category } from "@/types";
import {
  Laptop,
  Video,
  Briefcase,
  Home as HomeIcon,
  LayoutGrid,
} from "lucide-react";

interface CategoryFilterProps {
  category: Category;
  active: boolean;
  onClick: (category: Category) => void;
}

const getCategoryIcon = (category: Category) => {
  switch (category) {
    case "Bible Study":
      return Laptop;
    case "Scripture Analysis":
      return Video;
    case "Theology":
      return Briefcase;
    case "Christian Living":
      return HomeIcon;
    default:
      return LayoutGrid;
  }
};

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  category,
  active,
  onClick,
}) => {
  const Icon = getCategoryIcon(category);

  return (
    <button
      onClick={() => onClick(category)}
      className={`px-4 py-2.5 rounded-full flex items-center gap-2 text-sm font-medium transition-all duration-200 ${
        active ? "bg-black text-white" : "bg-white text-black hover:bg-black/5"
      }`}
    >
      <Icon size={16} />
      <span>{category}</span>
    </button>
  );
};

export default CategoryFilter;
