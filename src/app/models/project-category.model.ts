import { Project } from "./project.model";

export interface ProjectCategory {
    id?: number;
    name: string;
    description: string;
    projects: Project[];
    createdAt?: Date;
    editedAt?: Date;
}
