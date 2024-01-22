import { User } from "./user.model";

export interface Project {
    id?: number | string;
    title: string;
    duration: string;
    description: string;
    photoUrl?: string;
    logoUrl?: string;
    sponsorLogoUrl?: string;
    link?: string;
    author?: User | string;
    createdAt?: Date;
    editedAt?: Date;
}
