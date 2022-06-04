import {BaseResponse} from "@hiboard/api/api.types";
import {Activities} from "@hiboard/activities/types/activities.type";

export namespace Templates {
  export interface Entity {
    id: string;
    name: string,
    activities: Activities.Entity[];
  }

  export interface UpdateWithNewActivityBody {
    templatesIds: string[],
    activityId: string
  }

  export interface Response extends BaseResponse<Entity[]> {
  }

  export interface TemplateResponse extends BaseResponse<Entity> {
  }
}
