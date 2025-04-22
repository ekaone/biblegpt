import React from "react";
import Image from "next/image";
import { Bell, ChevronDown, X } from "lucide-react";
import ActivityGraph from "./activity-graph";
import MyCourseItem from "./my-course-item";
import { User, CourseData } from "@/types";

interface ProfileSidebarProps {
  user: User;
  courses: CourseData[];
  onClose?: () => void;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  user,
  courses,
  onClose,
}) => {
  const enrolledCourses = courses.filter((course) =>
    user.enrolledCourses.includes(course.id)
  );

  // Extract last 7 months for the activity graph
  const recentMonths = Object.keys(user.activityData.months).slice(-7);

  return (
    <div className="bg-[#f8f3ef] h-full py-6 px-6 flex flex-col">
      <div className="flex justify-between items-start">
        <button className="p-2 rounded-full hover:bg-black/5">
          <Bell className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full hover:bg-black/5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-black/5 lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center mt-4">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-purple-200">
          <Image
            src={user.avatar}
            alt={user.name}
            className="w-full h-full object-cover"
            width={20}
            height={20}
          />
        </div>
        <h2 className="font-semibold text-lg mt-2">{user.name}</h2>

        <div className="flex items-center mt-4 bg-white rounded-full px-4 py-2">
          <div className="flex -space-x-1 mr-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full overflow-hidden border-2 border-white"
              >
                <Image
                  src="https://randomuser.me/api/portraits/12.jpg"
                  alt="Friend"
                  className="w-full h-full object-cover"
                  width={20}
                  height={20}
                />
              </div>
            ))}
          </div>
          <span className="font-medium text-sm">{user.friendsCount}</span>
          <span className="text-sm ml-1 text-gray-500">Friends</span>
          <ChevronDown className="w-4 h-4 ml-1 text-gray-500" />
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Activity</h3>
          <div className="flex items-center bg-white rounded-full px-3 py-1">
            <span className="text-sm font-medium">Year</span>
            <ChevronDown className="w-4 h-4 ml-1" />
          </div>
        </div>

        <div className="flex items-center mt-2">
          <span className="text-xl font-bold">{user.activityData.hours}h</span>
          <div className="flex items-center ml-2 bg-yellow-100 px-2 py-1 rounded-full">
            <span role="img" aria-label="thumbs up" className="mr-1">
              👍
            </span>
            <span className="text-xs font-medium">
              {user.activityData.message}
            </span>
          </div>
        </div>

        <div className="mt-4">
          <ActivityGraph
            data={user.activityData.months}
            months={recentMonths}
          />
        </div>
      </div>

      <div className="mt-8">
        <h3 className="font-medium mb-2">My courses</h3>
        <div className="space-y-3">
          {enrolledCourses.map((course) => (
            <MyCourseItem key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
