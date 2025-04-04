export interface User {
  id: string;
  name: string;
  email: string;
}

export enum EUserRole {
  ADMIN = "ADMIN",
  DEVELOPER = "DEVELOPER",
}

export type ProjectUser = User & {
  role: EUserRole
};
