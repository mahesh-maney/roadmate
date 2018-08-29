import {UserRole} from '../user-role/user-role.model';
export class UserAccess {
    constructor(
        public id?: number,
        public code?: string,
        public description?: string,
        public userRole?: UserRole,
    ) {
    }
}
