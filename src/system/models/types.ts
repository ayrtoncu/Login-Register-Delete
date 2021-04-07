export const SET_USER = 'SET_USER';
export const SIGN_OUT = 'SIGN_OUT';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const NEED_VERIFICATION = 'NEED_VERIFICATION';
export const SET_SUCCES = 'SET_SUCCES';

export interface User {
  firstname: string;
  email: string;
  id: string;
  createdAt: any;
}
export interface AuthState {
  user: User | null;
  authenticated: boolean;
  loading: boolean;
  error: string;
  needVerification: boolean;
  succes: string;
}

export interface SignUpData {
  firstName: string;
  email: string;
  password: string;
}
export interface SignInData {
  email: string;
  password: string;
}

//Acciones

interface SetUserAction {
  type: typeof SET_USER;
  payload: User;
}

interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: boolean;
}

interface SignOutAction {
  type: typeof SIGN_OUT;
}

interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: string;
}

interface NeedVerficationAction {
  type: typeof NEED_VERIFICATION;
}

interface SetSuccesAction{
  type: typeof SET_SUCCES;
  payload: string;
}

export type AuthAction = SetUserAction | SetLoadingAction | SignOutAction | SetErrorAction | NeedVerficationAction | SetSuccesAction;