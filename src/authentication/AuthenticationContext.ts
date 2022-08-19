import { createContext } from 'react';
import AuthenticationState from './AuthenticationState';

const AuthenticationContext = createContext<AuthenticationState>({ accessToken: undefined, refreshToken: undefined, authenticated: false });

export default AuthenticationContext;
