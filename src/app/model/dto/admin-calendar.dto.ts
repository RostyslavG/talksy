import { Group } from "../group.model";
import { User } from "../user.model";

export interface AdminCalendarDTO{
    user:User;
    group:Group;
}