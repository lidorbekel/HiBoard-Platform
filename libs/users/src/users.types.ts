import {BaseResponse} from "../../api/src/lib/api.types";

export namespace Users {
  export type Role = 'employee' | 'manager';

  export interface Entity {
    id: string;
    email: string;
    role: Role;
  }

  export interface Response extends BaseResponse<Entity> {}
}
