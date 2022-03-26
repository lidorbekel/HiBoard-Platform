import {BaseResponse} from "@hiboard/api/api.types";

export namespace User {
  export type Role = 'employee' | 'manager';

  export interface Entity {
    id: string,
    email: string;
    firstName: string,
    lastName: string,
    role: Role;
  }

  export interface Response extends BaseResponse<Entity> {}
}
