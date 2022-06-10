import {BaseResponse} from "@hiboard/api/api.types";

export namespace Activities {

  export interface InventoryEntity {
    id: string;
    title: string;
    description: string;
    tag: string;
    estimation?: {
      weeks: number,
      days: number,
      hours: number
    },
  }

  export interface Entity {
    activity: InventoryEntity;
    id: string;
    status: ActivityStatus;
  }

  export interface InventoryResponse extends BaseResponse<InventoryEntity> {
  }

  export interface Response extends BaseResponse<Entity[]> {
  }

  export interface PageQueryParams {
    name?: string;
    tag?: string;
    status?: string;
  }
}

export type ActivityStatus = "backlog" | "in-progress" | "done";



