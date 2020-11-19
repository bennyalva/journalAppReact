import { types } from "../types/types"
import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { startLoading, finishLoading } from "./ui";
import Swal from 'sweetalert2'
import { noteLogout } from "./notes";

export const startLoginEmailPassWord = (email, password) => {
    
    return (dispatch) => {
            dispatch(startLoading()); // este dispatch es el unico que se regresa cuando se hace testitng
            // para que los otros dipatch se muestren en el testing se agrega un return en firebase
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then( ({user}) => {
                dispatch(login(user.uid, user.displayName));
                dispatch(finishLoading());
             }).catch(e => {
                dispatch(finishLoading());
                Swal.fire('Error', e.message, 'error')
              });
    }
}

export const startReigisteredUser = (email, password, name) =>{
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then( async ({user}) => {
            await user.updateProfile({ displayName: name});
            dispatch(login(user.uid, user.displayName)) 
         }).catch(e => {
            Swal.fire('Error', e.message, 'error');
    
         });
    }
}
export const startGoogleLogin = () => {
    return (dispatch) => { /// cuando hacemos el return y va dentro los dispacth se puede ver cuando se hacemos testing
        firebase.auth().signInWithPopup( googleAuthProvider)
        .then( ({user}) => {
           dispatch(login(user.uid, user.displayName)) 
        });
    }
}
export const login = (uid, displayName) => ({
        type: types.login,
        payload: {
            uid,
            displayName
        }
    });

export const startLogout = () => {
    return async (dispatch) => {
        await firebase.auth().signOut();
        dispatch(logout());
        dispatch(noteLogout());
    }
} 

export const logout = () => (
    {
        type: types.logout
    }
);