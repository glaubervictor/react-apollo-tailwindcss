export enum ActionType {
  USER_IS_LOGGED,
  PROFILE_USER,
}

export interface UserIsLogged {
  type: ActionType.USER_IS_LOGGED;
  payload: boolean;
}

export interface ProfileUser {
  type: ActionType.PROFILE_USER;
  payload: string;
}

export type AppActions = UserIsLogged | ProfileUser;
