import React from "react";
import Image from "next/image";
import { CourseData } from "@/types";
import { Star } from "lucide-react";

interface MyCourseItemProps {
  course: CourseData;
}

const getCategoryColor = (category: string): string => {
  switch (category) {
    case "IT & Software":
      return "bg-pink-100";
    case "Business":
      return "bg-amber-100";
    case "Media Training":
      return "bg-purple-100";
    case "Interior":
      return "bg-emerald-100";
    default:
      return "bg-gray-100";
  }
};

const getCategoryIconBg = (category: string): string => {
  switch (category) {
    case "IT & Software":
      return "bg-pink-200";
    case "Business":
      return "bg-amber-200";
    case "Media Training":
      return "bg-purple-200";
    case "Interior":
      return "bg-emerald-200";
    default:
      return "bg-gray-200";
  }
};

const MyCourseItem: React.FC<MyCourseItemProps> = ({ course }) => {
  const categoryColor = getCategoryColor(course.category);
  const categoryIconBg = getCategoryIconBg(course.category);

  return (
    <div
      className={`rounded-lg p-4 ${categoryColor} transition-all duration-200 hover:scale-[1.02] cursor-pointer`}
    >
      <div className="flex items-start justify-between">
        <div
          className={`flex items-center justify-center rounded-lg ${categoryIconBg} p-1.5`}
        >
          <span className="font-medium text-xs">{course.category}</span>
        </div>

        <div className="flex items-center bg-white px-2 py-1 rounded-full">
          <Star className="w-3 h-3 text-yellow-500 mr-1" fill="currentColor" />
          <span className="text-xs font-semibold">{course.rating}</span>
        </div>
      </div>

      <h3 className="text-sm font-bold mt-2 mb-2">{course.title}</h3>

      <div className="flex justify-between items-center mt-1">
        <span className="text-xs text-gray-700">
          {course.students.toLocaleString()} students
        </span>

        <div className="flex -space-x-1">
          {course.instructors.map((instructor) => (
            <div
              key={instructor.id}
              className="w-5 h-5 rounded-full overflow-hidden border-2 border-white"
            >
              <Image
                src={instructor.avatar}
                alt="Instructor"
                className="w-full h-full object-cover"
                width={20}
                height={20}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyCourseItem;
