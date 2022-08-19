import { ActionTypes } from '@mui/base';
import AuthenticationState from './AuthenticationState';

export enum AuthenticationActionTypes {
  AUTHENTICATE,
  SET_AUTHENTICATION_STATE,
}

type AuthenticationAction = {
  type: AuthenticationActionTypes;
};

export default function AuthenticationReducer(authState: AuthenticationState, action: AuthenticationAction) {
  switch (action.type) {
    case AuthenticationActionTypes.AUTHENTICATE:
      
    case AuthenticationActionTypes.SET_AUTHENTICATION_STATE:
      return authState;
    default:
      return authState;
  }
}
