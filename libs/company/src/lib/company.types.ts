import {BaseResponse} from "@hiboard/api/api.types";

export namespace Company {
  export interface Entity {
    name: string,
    departments?: string[];
    admin: string;
  }

  export interface Response extends BaseResponse<Entity> {
  }
}
