import { Project } from "./project.model";

export interface ProjectCategory {
    id?: number;
    name: string;
    description: string;
    projects?: Project[];
    created_at?: Date;
    edited_at?: Date;
}
