import React from "react";
import CategoryFilter from "@/components/board/category-filter";
import { Category } from "@/types";

interface CategoryFiltersProps {
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const categories: Category[] = [
  "All",
  "Bible Study",
  "Scripture Analysis",
  "Theology",
  "Christian Living",
];

const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="flex flex-nowrap gap-3 my-6 overflow-x-auto pb-2 -mx-4 px-4 lg:mx-0 lg:px-0 lg:flex-wrap">
      {categories.map((category) => (
        <CategoryFilter
          key={category}
          category={category}
          active={selectedCategory === category}
          onClick={onCategoryChange}
        />
      ))}
    </div>
  );
};

export default CategoryFilters;
