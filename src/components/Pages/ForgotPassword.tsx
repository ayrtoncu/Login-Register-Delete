import React, { FC, useState, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Input from './../UIStore/Input';
import Button from './../UIStore/Button';
import Message from './../UIStore/Message';
import { sendPasswordResetEmail, setError, setSuccess} from './../../system/actions/authActions';
import {RootState} from '../../system';

const ForgotPassword: FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { error,succes } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(setError(''))
      }
      if (succes) {
        dispatch(setSuccess(''));
      }
    }
  }, [error, dispatch, succes]);

  const submitHandler = async(e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await dispatch(sendPasswordResetEmail(email, "¡Correo enviado!"));
    setLoading(false);
  }
  return (
    <section className="section">
      <div className="container">
        <h2 className="has-text-centered is size-2 mb-3"> Resetear Password</h2>
        <form className="form" onSubmit={submitHandler}>
          {error && <Message type='peligro' msg={error} />}
          {succes && <Message type='correcto' msg={succes} />}
          <Input
            type='email'
            name="email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder="Correo Electronico"
            label= "Correo Electronico"
          />
          <Button
            text={loading ? "Loading..." : "Enviar correo electrónico de restablecimiento de contraseña"}
            className="is-primary is-fullwidth mt-5"
            disabled={loading}
          />
        </form>
      </div>
    </section>
  )
}
export default ForgotPassword;
