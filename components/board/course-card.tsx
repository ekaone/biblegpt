import React from "react";
import Image from "next/image";
import { CourseData } from "@/types";
import { Star, Users } from "lucide-react";

interface CourseCardProps {
  course: CourseData;
}

const getCategoryColor = (category: string): string => {
  switch (category) {
    case "Bible Study":
      return "bg-pink-100";
    case "Scripture Analysis":
      return "bg-amber-100";
    case "Theology":
      return "bg-purple-100";
    case "Christian Living":
      return "bg-emerald-100";
    default:
      return "bg-gray-100";
  }
};

const getCategoryIconBg = (category: string): string => {
  switch (category) {
    case "Bible Study":
      return "bg-pink-200";
    case "Scripture Analysis":
      return "bg-amber-200";
    case "Theology":
      return "bg-purple-200";
    case "Christian Living":
      return "bg-emerald-200";
    default:
      return "bg-gray-200";
  }
};

const formatStudentCount = (count: number): string => {
  return count.toLocaleString("en-US");
};

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const categoryColor = getCategoryColor(course.category);
  const categoryIconBg = getCategoryIconBg(course.category);

  return (
    <div
      className={`rounded-3xl p-5 ${categoryColor} h-full transition-transform duration-300 hover:scale-[1.02] cursor-pointer`}
    >
      <div className="flex items-start mb-1">
        <div
          className={`flex items-center justify-center rounded-lg ${categoryIconBg} p-1.5 mr-2`}
        >
          {course.category === "Bible Study" && (
            <span className="font-medium text-xs">Bible Study</span>
          )}
          {course.category === "Scripture Analysis" && (
            <span className="font-medium text-xs">Scripture Analysis</span>
          )}
          {course.category === "Theology" && (
            <span className="font-medium text-xs">Theology</span>
          )}
          {course.category === "Christian Living" && (
            <span className="font-medium text-xs">Christian Living</span>
          )}
        </div>

        <div className="flex items-center ml-auto bg-white px-2 py-1 rounded-full">
          <Star
            className="w-3.5 h-3.5 text-yellow-500 mr-1"
            fill="currentColor"
          />
          <span className="text-xs font-semibold">{course.rating}</span>
        </div>

        {course.tags && course.tags.includes("Top 10") && (
          <div className="ml-2 bg-red-500 text-white px-2 py-1 rounded-full flex items-center">
            <span className="text-xs font-semibold">Top 10</span>
          </div>
        )}
      </div>

      <h3 className="text-lg font-bold mt-4 mb-4">{course.title}</h3>

      <div className="flex justify-between items-end mt-auto">
        <div className="flex items-center">
          <Users className="w-4 h-4 mr-1 text-gray-700" />
          <span className="text-sm text-gray-700">
            {formatStudentCount(course.students)} students
          </span>
        </div>

        <div className="flex -space-x-2">
          {course.instructors.map((instructor) => (
            <div
              key={instructor.id}
              className="w-8 h-8 rounded-full overflow-hidden border-2 border-white"
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

export default CourseCard;
