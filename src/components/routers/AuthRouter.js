import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { LoginScreen } from '../auth/LoginScreen'
import { RegisterScreen } from '../auth/RegisterScreen'

export const AuthRouter = () => {
    return (
        <div className="auth_main">
           <div className="auth_box_container">
           <Switch>
               <Route exact path="/auth/login" component={ LoginScreen } />
               <Route exact path="/auth/register" component={ RegisterScreen } />
               <Redirect to="/auth/login" />
               </Switch>
               </div> 
        </div>
    )
}
