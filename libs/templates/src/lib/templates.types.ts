import {BaseResponse} from "@hiboard/api/api.types";
import {Activities} from "@hiboard/activities/types/activities.type";

export namespace Templates {
  export interface Entity {
    id: string;
    name: string,
    activities: Activities.Entity[];
  }

  export interface Body {
    templatesIds: string[],
    activity: Omit<Activities.InventoryEntity, 'id'>
  }

  export interface Response extends BaseResponse<Entity[]> {
  }

  export interface TemplateResponse extends BaseResponse<Entity> {
  }
}
