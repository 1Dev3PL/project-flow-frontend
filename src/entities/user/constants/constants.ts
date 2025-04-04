import { EUserRole } from "entities/user";

export const userRoleNames = {
  [EUserRole.ADMIN]: "Админ",
  [EUserRole.DEVELOPER]: "Разработчик",
} as const;

export const userRoleSelectorOptions = [
  {
    title: userRoleNames[EUserRole.ADMIN],
    value: EUserRole.ADMIN,
  },
  {
    title: userRoleNames[EUserRole.DEVELOPER],
    value: EUserRole.DEVELOPER,
  },
];
