import React from "react";
import { CourseData } from "../data/courses";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@/components/ui/drawer";

interface CourseDrawerProps {
  course: CourseData | null;
  open: boolean;
  onClose: () => void;
}

const CourseDrawer: React.FC<CourseDrawerProps> = ({
  course,
  open,
  onClose,
}) => {
  if (!course) return null;

  // Use the course's color as the background for the drawer
  return (
    <Drawer
      open={open}
      onOpenChange={(o) => {
        if (!o) onClose();
      }}
      direction="bottom"
    >
      <DrawerContent
        className={`max-w-lg mx-auto rounded-t-3xl p-0 ${course.category_color}`}
      >
        <DrawerHeader className="pt-6 pb-2 px-6">
          <span
            className={`text-xs font-semibold px-2 py-1 rounded ${course.category_color} text-gray-700`}
          >
            {course.category}
          </span>
          <DrawerTitle className="text-2xl font-bold mt-3 mb-2">
            {course.title}
          </DrawerTitle>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-yellow-500 font-semibold">
              ⭐ {course.rating}
            </span>
            <span className="text-sm text-gray-500">
              {course.students.toLocaleString()} students
            </span>
          </div>
          <div className="flex -space-x-2 mt-2">
            {course.instructors.map((inst) => (
              <img
                key={inst.id}
                src={inst.avatar}
                alt="Instructor"
                className="w-9 h-9 rounded-full border-2 border-white"
              />
            ))}
          </div>
        </DrawerHeader>
        <div className="px-6 pb-6">
          <DrawerDescription>
            <h3 className="text-lg font-semibold mb-2">About this course</h3>
            <p className="mb-4 text-gray-700">
              Learn more about{" "}
              <span className="font-semibold">{course.title}</span>. This is a
              sample course description. Add real content here based on your
              course data.
            </p>
          </DrawerDescription>
        </div>
        <DrawerClose asChild>
          <button
            className="absolute top-4 right-6 text-2xl text-gray-500 hover:text-black"
            aria-label="Close"
          >
            ×
          </button>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
};

export default CourseDrawer;
