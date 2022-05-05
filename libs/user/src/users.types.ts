import {BaseResponse} from "@hiboard/api/api.types";

export namespace User {
  export type Role = 'Employee' | 'Manager' | 'Admin';

  export interface Entity {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: Role;
    companyId: string;
    department: string;
  }

  export interface Response extends BaseResponse<Entity> {
  }
}
