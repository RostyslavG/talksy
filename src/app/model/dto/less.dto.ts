import { Lesson } from "../lesson.model";
import { User } from "../user.model";

export interface LessDTO{
    user:User;
    lesson:Lesson;
    test:string;
}