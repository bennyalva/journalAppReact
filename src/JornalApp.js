import React from 'react'
import { AppRouter } from './components/routers/AppRouter'
import { Provider } from 'react-redux';
import { store } from './store/store';
export const JornalApp = () => {
    return (
        <Provider store={ store }>
            <AppRouter />
        </Provider>
        
    )
}
