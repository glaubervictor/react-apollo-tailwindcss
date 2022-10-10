export interface AppState {
  userIsLogged: boolean;
  profileUser: string;
}

export const initialAppState: AppState = {
  userIsLogged: false,
  profileUser: "",
};
