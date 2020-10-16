import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { useDispatch } from 'react-redux'
import { login } from '../../actions/auth'

export const LoginScreen = () => {
    const dispatch = useDispatch();
    const [formValues, handlerInputChanges] = useForm({
        email: 'benny@gmail.com',
        password: '123456'
    });

    const { email, password} = formValues;

    const handlerLogin = (e) => {
        e.preventDefault();
        dispatch(login(12345, 'Benny'));
    }

    return (
        <>
            <h3 className="auth__title">Login</h3>
            <form onSubmit={ handlerLogin }>
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
                    value={password}
                    onChange={ handlerInputChanges }
                />
                <button
                    className="btn btn-primary btn-block"
                    type="submit">
                    Login
                </button>
                <hr />
                <div  className="auth__social-networks">
                    <p>Login with social networks</p>
                    <div 
                            className="google-btn"
                        >
                            <div className="google-icon-wrapper">
                                <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                            </div>
                            <p className="btn-text">
                                <b>Sign in with google</b>
                            </p>
                        </div>
                </div>
                <Link to="/auth/register" className="link">
                  Create account
                </Link>
            </form>
        </>
    )
}
