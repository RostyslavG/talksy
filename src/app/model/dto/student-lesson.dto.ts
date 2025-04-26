import { Lesson } from "../lesson.model";
import { User } from "../user.model";

export interface StudentLessonDTO{
    user:User;
    lessons:Array<Lesson>;
}