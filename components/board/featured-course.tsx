import React from "react";
import Image from "next/image";
import { CourseData } from "@/types";
import { Star, Users } from "lucide-react";

interface FeaturedCourseProps {
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

const FeaturedCourse: React.FC<FeaturedCourseProps> = ({ course }) => {
  const categoryColor = getCategoryColor(course.category);

  return (
    <div className="mt-8">
      <h2 className="text-lg font-medium text-gray-800 mb-3">
        Featured course
      </h2>
      <div
        className={`rounded-3xl p-6 ${categoryColor} transition-transform duration-300 hover:scale-[1.01] cursor-pointer`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className="font-medium bg-white px-3 py-1.5 rounded-full text-sm">
              {course.category}
            </span>
          </div>

          <div className="flex items-center">
            <Star
              className="w-4 h-4 text-yellow-500 mr-1"
              fill="currentColor"
            />
            <span className="font-semibold">{course.rating}</span>
          </div>
        </div>

        <h3 className="text-xl font-bold mb-2">{course.title}</h3>

        <div className="flex items-center mt-2">
          <Users className="w-4 h-4 mr-1 text-gray-700" />
          <span className="text-sm text-gray-700">
            {course.students.toLocaleString("en-US")} students
          </span>
        </div>

        <div className="flex justify-between mt-4">
          <button className="bg-black text-white px-6 py-2 rounded-full font-medium text-sm hover:bg-gray-800 transition-colors">
            View Course
          </button>

          <div className="flex -space-x-2">
            {course.instructors.map((instructor) => (
              <div
                key={instructor.id}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-white"
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
    </div>
  );
};

export default FeaturedCourse;
