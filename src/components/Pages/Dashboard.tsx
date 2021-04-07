import React,{FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Message from "../UIStore/Message";
import { setSuccess } from "../../system/actions/authActions";
import { RootState } from "../../system";

const Dashboard: FC = () => {
  const { user, needVerification, succes } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (succes) {
      dispatch(setSuccess(''));
    }
  }, [succes, dispatch]);

  return (
    <section className="section">
      <div className="container">
        {needVerification && <Message type="correcto" msg="Porfavor verifica tu correo electronico" />}
        <h1 className="is-size-1"> Bienvenido {user?.firstname}</h1>
      </div>
    </section>
  )
}
export default Dashboard;