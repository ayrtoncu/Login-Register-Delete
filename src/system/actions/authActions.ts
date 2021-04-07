import { ThunkAction } from 'redux-thunk'

import {SignUpData, AuthAction, SET_USER, User, SET_LOADING, SIGN_OUT, SignInData, SET_ERROR, NEED_VERIFICATION, SET_SUCCES} from '../models/types'
import { RootState } from '..'
import firebase from '../../services/firebase'

//Crear Usuario
export const signup = (data: SignUpData, onError: () => void): ThunkAction<void, RootState, null, AuthAction> => {
  return async dispatch => {
    try {
      const res = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password);
      if (res.user) {
        const userData: User = {
          email: data.email,
          firstname: data.firstName,
          id: res.user.uid,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        };
        await firebase.firestore().collection('/users').doc(res.user.uid).set(userData);
        await res.user.sendEmailVerification();
        dispatch({
          type: NEED_VERIFICATION
        });
        dispatch({
          type: SET_USER,
          payload: userData
        })
      }
    } catch (err) {
      console.log(err)
      onError();
      dispatch({
        type: SET_ERROR,
        payload: err.message
      })
    }
  }
}

//Enviar Usuario por ID
export const getUserByID = (id: string): ThunkAction<void, RootState, null, AuthAction> => {
  return async dispatch => {
    try {
      const user = await firebase.firestore().collection('users').doc(id).get();
      if (user.exists) {
        const userData = user.data() as User;
        dispatch({
          type: SET_USER,
          payload: userData
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
}

//Enviar Carga

export const setLoading = (value: boolean): ThunkAction<void, RootState, null, AuthAction> => {
  return dispatch => {
    dispatch({
      type: SET_LOADING,
      payload:value
    })
  }
}

//Log in
export const signin = (data: SignInData, onError: ()=> void): ThunkAction<void, RootState, null, AuthAction> => {
  return async dispatch => {
    try {
      await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
    } catch (err) {
      console.log(err);
      onError();
      dispatch(setError(err.message));
    }
  }
}

//Cerrar Sesion
export const signout = (): ThunkAction<void, RootState, null, AuthAction> => {
  return async dispatch => {
    try {
      dispatch(setLoading(true));
      await firebase.auth().signOut;
      dispatch({
        type: SIGN_OUT
      })
    } catch (err) {
      console.log(err);
      dispatch(setLoading(false));
    }
  }
}

//Enviar Error
export const setError = (msg: string): ThunkAction<void, RootState, null, AuthAction> => {
  return dispatch => {
    dispatch({
      type: SET_ERROR,
      payload: msg
    })
  }
}

//Enviar Verificacion
export const setNeedVerification = (): ThunkAction<void, RootState, null, AuthAction> => {
  return dispatch => {
    dispatch({
      type: NEED_VERIFICATION
    })
  }
}

//Establecer éxito
export const setSuccess = (msg: string): ThunkAction<void, RootState, null, AuthAction> => {
  return dispatch => {
    dispatch({
      type: SET_SUCCES,
      payload:msg
    })
  }
}

// Resetear password
export const sendPasswordResetEmail = (email: string, succesMsg: string): ThunkAction<void, RootState, null, AuthAction> => {
  return async dispatch => {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      dispatch(setSuccess(succesMsg));
    } catch (err) {
      console.log(err);
      dispatch(setError(err.message));
    }
  }
}