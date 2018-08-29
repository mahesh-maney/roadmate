export interface Account {
  activated: boolean;
  authorities?: (string)[] | null;
  createdBy: string;
  createdDate: string;
  email: string;
  firstName: string;
  id: number;
  imageUrl: string;
  langKey: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
  lastName: string;
  login: string;
}
