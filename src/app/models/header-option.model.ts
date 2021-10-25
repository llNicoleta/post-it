import {AvatarModel} from "./avatar.model";

export interface HeaderOptionModel {
  title: string | undefined,
  icon?: string | undefined,
  avatar?: AvatarModel | undefined | null,
  link?: string,
  display: boolean
}
