import {BaseResponse} from "@hiboard/api/api.types";

export namespace activities {
  export interface PageQueryParams {
    names: string[],
    tags: string[],
    statuses: string[]
  }

  export interface Entity {
    id: string;
    title: string;
    description: string;
    tag: TaskTag;
    status: activitiestatus;
    dependence?: string;
    estimation?: string;
  }

  export interface Response extends BaseResponse<{ activities: Entity[] }> {
  }
}

export type TaskTag = "HR" | "R&D" | "Sales";

export type activitiestatus = "backlog" | "in-progress" | "done";



