import { User } from "../user.model";

export interface LessonAdmin {
    id: string;
    theme: string;
    time: string;
}

export interface TeacherAdmin {
    id: string;
    name: string;
    lastname: string;
}

export interface AdminDTO {
    lessons: LessonAdmin[];
    teachers: TeacherAdmin[];
    adminName: string;
    adminLastname: string;
    role: string;
}

export interface AdminTeachersDTO{
    user: User;
    teachers: Array<User>;
}
