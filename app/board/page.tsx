"use client";

import React, { useState } from "react";
import { Category } from "@/types";
import MainLayout from "@/components/board/main-layout";
import Header from "@/components/board/header";
import CategoryFilters from "@/components/board/category-filters";
import CourseGrid from "@/components/board/course-grid";
import FeaturedCourse from "@/components/board/featured-course";
import { courses } from "@/data/courses";

function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
  };

  // This would typically come from an API or be selected based on criteria
  const featuredCourse = courses[3]; // Using the Interior Design course as featured

  return (
    <MainLayout>
      <div className="max-w-4xl">
        <Header />

        <CategoryFilters
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        <CourseGrid courses={courses} selectedCategory={selectedCategory} />

        <FeaturedCourse course={featuredCourse} />
      </div>
    </MainLayout>
  );
}

export default App;
