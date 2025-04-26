import { User } from './user.model';
import { Lesson } from './lesson.model';

export interface UserLesson {
    id: string;
    userId: string;
    user: User;
    lessonId: string;
    lesson: Lesson;
    homework: string;
    pointOfWork: number;
    homeworkUrl: string;
}
