import {UserRole} from '../user-role/user-role.model';
export class AohUser {
    constructor(
        public id?: number,
        public otpLookup?: number,
        public emailAddress?: string,
        public mobileNumber?: string,
        public userLoggedIn?: boolean,
        public activationDate?: any,
        public deactivationDate?: any,
        public userRole?: UserRole,
    ) {
        this.userLoggedIn = false;
    }
}
