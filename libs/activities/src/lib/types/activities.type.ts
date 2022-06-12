import {BaseResponse} from "@hiboard/api/api.types";

export namespace Activities {

  export interface InventoryEntity {
    id: string;
    title: string;
    description: string;
    tag: string;
    week: number;
    timeEstimation: string;
    userAverageTime: string;
  }

  export interface Entity {
    activity: InventoryEntity;
    id: string;
    status: ActivityStatus;
    isOnTime: boolean;
  }

  export interface InventoryResponse extends BaseResponse<InventoryEntity> {
  }

  export interface Response extends BaseResponse<Entity[]> {
  }

  export interface PageQueryParams {
    name?: string;
    week?: string;
    tag?: string;
    status?: string;
  }
}

export type ActivityStatus = "Backlog" | "InProgress" | "Done";



