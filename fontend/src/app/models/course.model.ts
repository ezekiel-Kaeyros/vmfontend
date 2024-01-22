import { User } from "./user.model";

export interface Course {
    id?: number | string;
    title: string;
    description: string;
    category?: number;
    start_date?: Date;
    end_date?: Date;
    course_fees?: number;
    link: string;
    author?: User | string;
    createdAt?: Date;
    editedAt?: Date;
}
