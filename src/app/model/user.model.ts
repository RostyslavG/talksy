import { RefreshToken } from './refresh-token.model';
import { Role } from './role.model';
import { Group } from './group.model';
import { UserLesson } from './user-lesson.model';

export interface User {
    id: string;
    name?: string;
    lastName?: string;
    birthday?: string;
    levelName?: string;
    email: string;
    hashedPassword: string;
    refreshToken: RefreshToken;
    roleName: string;
    role: Role;
    levelNumber?: number;
    point1?: number;
    point2?: number;
    point3?: number;
    groupId?: string;
    group: Group;
    userLessons: UserLesson[];
}
