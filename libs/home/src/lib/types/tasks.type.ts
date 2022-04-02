import {BaseResponse} from "@hiboard/api/api.types";

export namespace Tasks {
  export interface Entity {
    id: string;
    title: string;
    description: string;
    tag: Tag;
    status: TaskStatus;
    dependence?: string;
    estimation?: string;
  }

  export interface Response extends BaseResponse<{ tasks: Entity[] }> {}
}

type Tag = "HR" | "RD" | "Sales";

type TaskStatus = "backlog" | "in-progress" | "done";



