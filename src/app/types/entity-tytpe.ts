import { Category } from "../models/category.model";
import { CourseCategory } from "../models/course-category.model";
import { Course } from "../models/course.model";
import { ProjectCategory } from "../models/project-category.model";
import { Project } from "../models/project.model";
import { Role } from "../models/role.model";
import { User } from "../models/user.model";

export type Entity = User | Role | Course | Project | CourseCategory | ProjectCategory | Category;