import { Level } from './level.model';
import { User } from './user.model';
import { Test } from './test.model';

export interface Group {
    id: string;
    levelId: string;
    level: Level;
    teacherId: string;
    teacher: User;
    shedule?: string;
    testId?: string;
    test: Test;
    students: User[];
}
