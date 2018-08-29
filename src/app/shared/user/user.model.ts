export class User {
    public id?: any;
    public login?: string;
    public firstName?: string = '';
    public lastName?: string = '';
    public email?: string;
    public activated?: Boolean;
    public langKey?: string;
    public authorities?: any[];
    public createdBy?: string;
    public createdDate?: Date;
    public lastModifiedBy?: string;
    public lastModifiedDate?: Date;
    public password?: string;
    public username?: string;
    public mobileNumber?: string;
    public dob?: string;

  constructor(
        id?: any,
        login?: string,
        firstName?: string,
        lastName?: string,
        email?: string,
        activated?: Boolean,
        langKey?: string,
        authorities?: any[],
        mobileNumber?: string
    ) {
        this.id = id ? id : null;
        this.login = login ? login : email;
        this.firstName = firstName ? firstName : null;
        this.lastName = lastName ? lastName : null;
        this.email = email ? email : null;
        this.activated = activated ? activated : false;
        this.langKey = "en";
        this.authorities = authorities ? authorities : null;
        this.mobileNumber = mobileNumber ? mobileNumber : null;
    }
}
