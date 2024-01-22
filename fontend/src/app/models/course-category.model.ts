import { Course } from "./course.model";

export interface CourseCategory {
    id?: number;
    name: string;
    description: string;
    courses: Course[];
    createdAt?: Date;
    editedAt?: Date;
}
