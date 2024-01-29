import { User } from "./user.model";

export interface Project {
    id?: number;
    title: string;
    content: string;
    category_id?: number; // fk
    project_icon_url?: string; // project_icon_url
    project_image_url: string;
    sponsor_images_urls?: string[];
    director?: string; // lead
    user_id?: number;
    code?: string;
    created_at?: Date;
    edited_at?: Date;

    ////
    lead?: string;
}


