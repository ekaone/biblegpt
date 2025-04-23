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
  category_color: string;
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

/**
 * Bible Study = Multi choice questions
 * Scripture Analysis = Input form, and a textarea (Bible says about the topic)
 * Theology = Learn the bible in 30 days
 * Christian Living = How to read the bible
 */

export const courses: CourseData[] = [
  {
    id: "1",
    title: "Introduction to the Bible",
    category: "Bible Study",
    students: 9530,
    rating: 4.8,
    instructors: [
      { id: "1", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
      { id: "2", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
    ],
    category_color: "bg-pink-100",
  },
  {
    id: "2",
    title: "Understanding the Gospels",
    category: "Scripture Analysis",
    students: 1463,
    rating: 4.9,
    instructors: [
      { id: "3", avatar: "https://randomuser.me/api/portraits/women/68.jpg" },
      { id: "4", avatar: "https://randomuser.me/api/portraits/men/75.jpg" },
    ],
    category_color: "bg-amber-100",
  },
  {
    id: "3",
    title: "Paul's Letters Explained",
    category: "Theology",
    students: 6726,
    rating: 4.9,
    instructors: [
      { id: "5", avatar: "https://randomuser.me/api/portraits/men/42.jpg" },
      { id: "6", avatar: "https://randomuser.me/api/portraits/women/65.jpg" },
    ],
    category_color: "bg-purple-100",
  },
  {
    id: "4",
    title: "Old Testament Foundations",
    category: "Bible Study",
    students: 8719,
    rating: 5.0,
    tags: ["Top 10"],
    instructors: [
      { id: "7", avatar: "https://randomuser.me/api/portraits/women/22.jpg" },
    ],
    category_color: "bg-pink-100",
  },
  {
    id: "5",
    title: "Bible Study for Beginners",
    category: "Christian Living",
    students: 9530,
    rating: 4.8,
    instructors: [
      { id: "8", avatar: "https://randomuser.me/api/portraits/men/36.jpg" },
      { id: "9", avatar: "https://randomuser.me/api/portraits/women/48.jpg" },
    ],
    category_color: "bg-emerald-100",
  },
];

export const userData: User = {
  name: "Annette Black",
  avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  friendsCount: 274,
  activityData: {
    hours: 3.5,
    months: {
      Jan: 15,
      Feb: 20,
      Mar: 10,
      Apr: 25,
      May: 15,
      Jun: 30,
      Jul: 40,
      Aug: 25,
      Sep: 35,
      Oct: 20,
      Nov: 15,
      Dec: 45,
    },
    message: "Great result!",
  },
  enrolledCourses: ["1", "5"],
};
