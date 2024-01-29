import { Course } from "./course.model";

export interface CourseCategory {
    id?: number;
    name: string;
    description: string;
    course_ids: number[]; // fks
    created_at: Date;
    edited_at: Date;
}
