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
    totalActivities: number;
    completedActivities: number;
    done: number
  }

  export interface NewEntity extends Omit<User.Entity, 'id'> {
    password: string;
  }

  export interface Response extends BaseResponse<Entity> {
  }

  export interface UsersResponse extends BaseResponse<Entity[]> {
  }
}
