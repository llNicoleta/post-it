import {AvatarModel} from "./avatar.model";

export interface HeaderOptionModel {
  title: string,
  icon?: string,
  avatar?: AvatarModel | undefined | null,
}
