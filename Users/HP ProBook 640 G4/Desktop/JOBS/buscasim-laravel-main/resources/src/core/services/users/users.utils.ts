import { getOptionsFromObject } from "@/core/utils";
import { UserRolesType } from ".";

const userRoles: Record<UserRolesType, string> = {
  admin: "Administrador",
  user: "Usuário",
};

export const userRolesOptions = getOptionsFromObject(userRoles);

export const getUserRole = (role: UserRolesType) => userRoles[role];
