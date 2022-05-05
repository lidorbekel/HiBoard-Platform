import {BaseResponse} from "@hiboard/api/api.types";

export namespace User {
  export type Role = 'Employee' | 'Manager' | 'Admin';

  export type Department = 'R&D' | 'Product' | 'Sales' | 'Unspecified';

  export interface Entity {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: Role;
    companyId: string;
    department?: Department;
  }

  export interface Response extends BaseResponse<Entity> {
  }
}
