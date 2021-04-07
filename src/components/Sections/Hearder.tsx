import React, { FC } from "react";
import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Button from './../UIStore/Button';
import { RootState } from '../../system';
import { signout } from './../../system/actions/authActions';

const Header: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state: RootState) => state.auth);

  const logoutClickHandler = () => {
    dispatch(signout());
  }

  return (
    <nav className="nav is-spaced has-shadow">
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item" to={!authenticated ? "/" : "/dashboard"}> AppName </Link>
        </div>
        <div className="navbar-end">
          <div className="navbar-items">
            {!authenticated ? <div className="buttons">
              <Button text="Registrarse" onClick={() => history.push('/signup')} className="is-primary" />
              <Button text="Ingresar" onClick={() => history.push('/signin')}/>
            </div>
            :
            <Button text="Sign Out" onClick={logoutClickHandler} />
          }
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Header;
