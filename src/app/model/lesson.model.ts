import { UserLesson } from './user-lesson.model';

export interface Lesson {
    id: string;
    thame: string;
    lessonFile: string;
    homework: string;
    deadline: Date;
    userLessons: UserLesson[];
}
