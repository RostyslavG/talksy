import { User } from './user.model';

export interface RefreshToken {
    id: string;
    token: string;
    expires: Date;
    isActive: boolean;
    userId: string;
    user: User;
}
