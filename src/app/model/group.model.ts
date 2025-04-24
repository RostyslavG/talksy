import { Level } from './level.model';
import { User } from './user.model';


export interface Group {
    id: string;
    levelId: string;
    level: Level;
    teacherId: string;
    teacher: User;
    shedule?: string;
    testName?: string;
    testBody?: string;
    testDate?: Date;
    students: User[];
}
