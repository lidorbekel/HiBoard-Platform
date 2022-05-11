import {BaseResponse} from "@hiboard/api/api.types";

export namespace User {
  export type Role = 'Employee' | 'Manager' | 'Admin';

  export interface Entity {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: Role;
    companyId: string;
    department: string;
    done: number
  }

  export interface Response extends BaseResponse<Entity> {
  }

  export interface EmployeesResponse extends BaseResponse<{ employees: Entity[] }> {
  }
}
