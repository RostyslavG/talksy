import { LessonDTO } from './lesson.dto';
import { User } from '../user.model';

export interface AdminDTO {
    lessons: LessonDTO[];
    teachers: User[];
    user: User;
    groupId: string;
}

export interface AdminTeachersDTO{
    user: User;
    teachers: Array<User>;
}