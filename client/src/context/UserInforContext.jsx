import { createContext, useReducer } from "react";

export const UserInformation = createContext();

//Reducer
export const userInformationReducer = (state, action) => {
  switch (action.type) {
    case "SET_INFOR":
      return {
        ...state,
        UserInformation: action.payload,
      };

    case "INFOR_CREATE":
      return {
        ...state,
        UserInformation: [
          action.payload,
          ...action(state.UserInformation || []),
        ],
      };

    //if it really need can add DELETE_ORDER also

    default:
      return state;
  }
};

//context Provider

export const UserInformationContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userInformationReducer, {
    userInformation: null,
  });

  return (
    <UserInformation.Provider value={{ ...state, dispatch }}>
      {children}
    </UserInformation.Provider>
  );
};
