import { User } from "../user.model";

export interface LessonDTO {
    id: string;
    theme: string;
    time: string;
}

export interface AdminDTO {
    lessons: LessonDTO[];
    teachers: User[];
    user: User;
    groupId:string;
}

export interface AdminTeachersDTO{
    user: User;
    teachers: Array<User>;
}