import { User } from "shared/types";

export enum EUserRole {
  ADMIN = "ADMIN",
  DEVELOPER = "DEVELOPER",
}

export type ProjectUser = User & {
  role: EUserRole
};
