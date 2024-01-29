import { User } from "./user.model";

export interface Course {
    id?: number;
    title: string;
    content: string;
    category_id?: number; // fk
    course_fees?: number;
    duration?: number;
    start_date?: Date;
    end_date?: Date;
    start_time?: string;
    end_time?: string;
    director?: string; // lead
    user_id?: number;
    code?: string;
    location?: string;
    created_at?: Date;
    edited_at?: Date;
    days: string;
    category_name?: string;

    ///////
    lead?: string;
}
