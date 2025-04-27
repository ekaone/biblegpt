import React from "react";
import { CourseData, Category } from "@/types";
import { useCourseDrawerStore } from "@/store/course-drawer-store";
import CourseCard from "@/components/board/course-card";
import CourseDrawer from "@/components/course-drawer";

interface CourseGridProps {
  courses: CourseData[];
  selectedCategory: Category;
}

const CourseGrid: React.FC<CourseGridProps> = ({
  courses,
  selectedCategory,
}) => {
  const { open, course, openDrawer, closeDrawer } = useCourseDrawerStore();

  const filteredCourses =
    selectedCategory === "All"
      ? courses
      : courses.filter((course) => course.category === selectedCategory);

  return (
    <>
      <div>
        <h2 className="text-lg font-medium text-gray-800 mb-4">Most popular</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onClick={() => openDrawer(course)}
            />
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">No courses found in this category.</p>
          </div>
        )}
      </div>
      <CourseDrawer open={open} course={course} onClose={closeDrawer} />
    </>
  );
};

export default CourseGrid;
