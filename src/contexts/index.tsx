import React, { createContext, useReducer } from "react";
import { AppActions, appReducer, initialAppState, AppState } from "./store";

type PropsUserStatusContext = {
  state: AppState;
  dispatch: React.Dispatch<AppActions>;
};

const AppContext = createContext<PropsUserStatusContext>({
  state: initialAppState,
  dispatch: () => null,
});

const AppProvider = ({ children }: any): JSX.Element => {
  const [state, dispatch] = useReducer(appReducer, initialAppState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider };
export default AppContext;
