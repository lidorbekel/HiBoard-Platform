import {BaseResponse} from "@hiboard/api/api.types";

export namespace Activities {

  export interface Entity {
    id: string;
    title: string;
    description: string;
    tag: string;
    status: ActivityStatus;
    estimation?: {
      weeks: number,
      days: number,
      hours: number
    },
    // department: string;
  }

  export interface Response extends BaseResponse<{ activities: Entity[] }> {
  }

  export interface PageQueryParams {
    name?: string;
    tag?: string;
    status?: string;
  }
}

export type ActivityStatus = "backlog" | "in-progress" | "done";



