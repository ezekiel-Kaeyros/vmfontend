import { Course } from "./course.model";

export interface CourseCategory {
    id?: number;
    name: string;
    description: string;
    courses?: Course[];
    created_at?: Date;
    edited_at?: Date;
}
