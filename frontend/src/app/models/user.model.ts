import { Role } from './role.model';
export interface User {
    id?: number;
    email: string;
    name?: string;
    username?: string;
    password?: string;
    roles?: Role[];
    created_at?: Date;
    edited_at?: Date;
}
