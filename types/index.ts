export type Category =
  | "All"
  | "Bible Study"
  | "Scripture Analysis"
  | "Theology"
  | "Christian Living";

export interface CourseData {
  id: string;
  title: string;
  category: Exclude<Category, "All">;
  students: number;
  rating: number;
  tags?: string[];
  instructors: {
    id: string;
    avatar: string;
  }[];
}

export interface User {
  name: string;
  avatar: string;
  friendsCount: number;
  activityData: {
    hours: number;
    months: {
      [key: string]: number;
    };
    message: string;
  };
  enrolledCourses: string[];
}
