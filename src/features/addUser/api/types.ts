import { EUserRole } from "entities/user";

export type TAddUserRequestData = {
  email: string;
  role: EUserRole;
}
