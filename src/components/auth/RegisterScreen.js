import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { setErrorAction, removeErrorAction } from '../../actions/ui';
import { startReigisteredUser } from '../../actions/auth';

export const RegisterScreen = () => {
    const dispatch = useDispatch();
    const { msgError } = useSelector(state => state.ui);


    const [formValues, handlerInputChanges] = useForm({
        name: 'benny',
        email: 'benny@gmail.com',
        password: '123456',
        passeord2: '123456'
    });
    const { name, email, password , passeord2} = formValues;

    const handlerSubmitRegister = (e) => {
        e.preventDefault();
        if ( isFormValid()) {
            dispatch(startReigisteredUser(email, password, name));
        }
    }

    const isFormValid = () => {
      if (name.trim().length === 0) {
          dispatch(setErrorAction('name is crequired'));
        return false;
      } else if ( !validator.isEmail( email )) {
        dispatch(setErrorAction('Email is not valid'));
        return false;
      } else if ( password !== passeord2 || password.length < 5) {
        dispatch(setErrorAction('Password should be at least 5 cracters and match aeach other'));
          return false;
      }
      dispatch(removeErrorAction());
      return true;
    }
    return (
        <>
        <h3 className="auth__title">Register</h3>
        <form onSubmit={ handlerSubmitRegister }>
            {
                msgError && (
                   <div className="auth__alert-error">
                       {msgError}
                   </div>
                )
            }
            <input className="auth__input"
                type="text"
                placeholder="Name"
                name="name"
                autoComplete="off"
                value={ name }
                onChange={ handlerInputChanges }
            />
            <input className="auth__input"
                type="text"
                placeholder="Email"
                name="email"
                autoComplete="off"
                value={ email }
                onChange={ handlerInputChanges }
            />
            <input
                className="auth__input"
                type="Password"
                placeholder="password"
                name="password"
                value={ password }
                onChange={ handlerInputChanges }
            />
            <input className="auth__input"
                type="text"
                placeholder="Confirm password"
                name="passeord2"
                autoComplete="off"
                value={ passeord2 }
                onChange={ handlerInputChanges }
            />
            <button
                className="btn btn-primary btn-block mb-1"
                type="submit">
                Register
            </button>
    
            
            <Link to="/auth/login" className="link">
              Already register ?
            </Link>
        </form>
    </>
    )
}
