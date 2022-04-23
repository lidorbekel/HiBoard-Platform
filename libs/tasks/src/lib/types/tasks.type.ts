import {BaseResponse} from "@hiboard/api/api.types";

export namespace Tasks {
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
    status: TaskStatus;
    dependence?: string;
    estimation?: string;
  }

  export interface Response extends BaseResponse<{ tasks: Entity[] }> {
  }
}

export type TaskTag = "HR" | "R&D" | "Sales";

export type TaskStatus = "backlog" | "in-progress" | "done";



