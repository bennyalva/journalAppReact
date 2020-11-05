import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Redirect} from 'react-router-dom'
import { AuthRouter } from './AuthRouter'
import { JournalScreen } from '../journal/JournalScreen'
import {firebase} from '../../firebase/firebase-config'
import { useDispatch } from 'react-redux'
import { login } from '../../actions/auth'
import { PublicRoutes } from './PublicRoutes'
import { PrivateRoutes } from './PrivateRoutes'
import { startLoadingNotes } from '../../actions/notes'

export const AppRouter = () => {
    const dispatch = useDispatch();
    const [checking, setChecking] = useState(true);
    const [isLoggin, setIsLoggin] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName));
                setIsLoggin(true);
                dispatch(startLoadingNotes(user.uid));

            } else {
                setIsLoggin( false );
            }
            setChecking(false);
        })
    }, [dispatch, setChecking, setIsLoggin]);

    if ( checking ) {
        return (
            <h1> Wait....</h1>
        )
    }
    return (
        <Router>
            <div>
                <Switch>
                     <PublicRoutes isAuthenticated={ isLoggin }  path="/auth" component={ AuthRouter } /> 
                     <PrivateRoutes exact isAuthenticated={ isLoggin } path="/" component={ JournalScreen } />
                     <Redirect to="/auth/login" /> 

                </Switch>
            </div>
        </Router>
    )
}
