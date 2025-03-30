import { User } from './user.model';
import { Group } from './group.model';

export interface Level {
    id: string;
    name: string;
    users: User[];
    group: Group;
}
