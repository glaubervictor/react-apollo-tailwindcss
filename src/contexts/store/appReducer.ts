import { ActionType, AppActions } from './appActions';
import { AppState } from './appState';

export function appReducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case ActionType.USER_IS_LOGGED:
      return { ...state, userIsLogged: action.payload };
    case ActionType.PROFILE_USER:
      return { ...state, profileUser: action.payload };
    default:
      return state;
  }
}
