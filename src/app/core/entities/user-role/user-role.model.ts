import {UserAccess} from '../user-access/user-access.model';
import {AohUser} from '../aoh-user/aoh-user.model';
export class UserRole {
    constructor(
        public id?: number,
        public name?: string,
        public code?: string,
        public userAccess?: UserAccess,
        public aohUser?: AohUser,
    ) {
    }
}
