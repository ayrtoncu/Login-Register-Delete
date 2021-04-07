import React,{FC, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {BrowserRouter,Switch} from 'react-router-dom'
import './App.css';

import Header from "./components/Sections/Hearder";
import SignUp from './components/Pages/SignUp';
import SignIn from './components/Pages/SignIn';
import ForgotPassword from './components/Pages/ForgotPassword';
import Homepage from './components/Pages/Homepage';
import Dashboard from './components/Pages/Dashboard';
import PrivateRoute from './services/auth/PrivateRoute';
import PublicRoute from './services/auth/PublicRoute';
import Loader from './components/UIStore/Loader';
import firebase from './services/firebase';
import { getUserByID, setLoading, setNeedVerification } from './system/actions/authActions';
import { RootState } from './system';


const App: FC = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setLoading(true));
        await dispatch(getUserByID(user.uid));
        if (!user.emailVerified) {
          dispatch(setNeedVerification());
        }
      }
      dispatch(setLoading(false));
    });
    return () => {
      unsubscribe();
    }
  }, [dispatch]);
  if (loading) {
    return <Loader/>
  }
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <PublicRoute path="/" component={Homepage} exact />
        <PublicRoute path="/signup" component={SignUp} exact />
        <PublicRoute path="/sigin" component={SignIn} exact />
        <PublicRoute path="/forgot-password" component={ForgotPassword} exact/>
        <PrivateRoute path="/dashboard" component={Dashboard} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
