import {BaseResponse} from "@hiboard/api/api.types";

export namespace User {
  export type Role = 'employee' | 'manager' | 'admin';

  export type Department = 'R&D' | 'Product' | 'Sales';

  export interface Entity {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: Role,
    department?: Department
  }

  export interface Response extends BaseResponse<Entity> {
  }
}
