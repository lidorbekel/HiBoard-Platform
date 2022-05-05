import {BaseResponse} from "@hiboard/api/api.types";

export namespace Company {
  export interface Entity {
    id: string;
    name: string;
    departments: string[];
    description: string;
  }

  export interface Response extends BaseResponse<Entity> {
  }
}
