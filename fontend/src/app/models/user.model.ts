import { Role } from "./role.model";

export interface User {
    id?: number;
    email: string;
    password?: string;
    roles?: Role[];
    createdAt?: Date;
    editedAt?: Date;
}
