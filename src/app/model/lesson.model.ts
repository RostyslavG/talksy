import { UserLesson } from './user-lesson.model';

export interface Lesson {
    id: string;
    lessonCount: number;
    thame: string;
    desription: string;
    lessonFile: string;
    homework: string;
    lessonUrl:string;
    homeworkUrl:string;
    deadline: Date;
    createdAt: Date;
    userLessons:Array<UserLesson>
}
