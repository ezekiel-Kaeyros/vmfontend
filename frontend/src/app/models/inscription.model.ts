export interface Inscription {
    id?: number;
    email: string;
    first_name: string;
    last_name: string;
    message?: string;
    course_code?: string;
    course_title?: string;
    course_id?: number; // fk
    created_at?: Date;
    edited_at?: Date;
}
