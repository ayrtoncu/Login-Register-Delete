import React, { FC, useState, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Input from './../UIStore/Input';
import Button from './../UIStore/Button';
import Message from './../UIStore/Message';
import { signup, setError } from './../../system/actions/authActions';
import {RootState} from '../../system';

const SignUp: FC = () => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(setError(''))
      }
    }
  }, [error, dispatch]);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    dispatch(signup({ email, password, firstName }, () => setLoading(false)));
  }
  return (
    <section className="section">
      <div className="container">
        <h2 className="has-text-centered is size-2 mb-3"> Registrarse</h2>
        <form className="form" onSubmit={submitHandler}>
          {error && <Message type='peligro' msg={error} />}
          <Input
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.currentTarget.value)}
            placeholder="Primer Nombre"
            label= "Primer Nombre"
          />
          <Input
            type='email'
            name="email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder="Correo Electronico"
            label= "Correo Electronico"
          />
          <Input
            type='password'
            name="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            placeholder="Contraseña"
            label= "Contraseña"
          />
          <Button
            text={loading ? "Loading..." : "Registrarse"}
            className="is-primary is-fullwidth mt-5"
            disabled={loading}
          />
        </form>
      </div>
    </section>
  )
}
export default SignUp;