import { create } from 'zustand';
import { CourseData } from '../data/courses';

interface CourseDrawerState {
  open: boolean;
  course: CourseData | null;
  openDrawer: (course: CourseData) => void;
  closeDrawer: () => void;
}

export const useCourseDrawerStore = create<CourseDrawerState>((set) => ({
  open: false,
  course: null,
  openDrawer: (course) => set({ open: true, course }),
  closeDrawer: () => set({ open: false, course: null }),
}));
