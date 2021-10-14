export interface UserModel {
  id?: string,
  username: string,
  email: string,
  password?: string,
  firstName?: string,
  lastName?: string,
  description?: string,
  photo?: string,
  isModerator: boolean
}
