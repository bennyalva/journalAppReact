import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { types } from '../../../types/types';
const { mount } = require("enzyme");
const { RegisterScreen } = require("../../../components/auth/RegisterScreen");

const middlewares = [thunk]; // config store
const mockStore = configureStore(middlewares); // config store

const initState = { // inicia es estado del store que se necesita cuando se renderiza el componente
    auth: {},
    ui: {
        loading: false,
        msgError: ''
    }
};

let store  = mockStore(initState);
// store.dispatch = jest.fn(); // para manejar los dispatch del store pero solo para las que son asyncronas(Promise)


describe('Test onRegisterScreen', () => {
    const wrapper = mount(
    <Provider store={ store }>
       <MemoryRouter>
       <RegisterScreen />
       </MemoryRouter>
    </Provider>)
   test('should call show correctly', () => {
       expect(wrapper).toMatchSnapshot()
   });

   test('should do dispatch acción respective', () => {
        const emailField = wrapper.find('input[name="email"]');
        emailField.simulate('change', {
            target: {
                value: '',
                name: 'email'
            }
        });
        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });
        const actions = store.getActions();
        expect(actions[0].type).toEqual( types.uiSetError);
   });
   test('should show alert box', () => {
    const initState = { // inicia es estado del store que se necesita cuando se renderiza el componente
        auth: {},
        ui: {
            loading: false,
            msgError: 'Email no es correcto'
        }
    };
    
    const store  = mockStore(initState);
    const wrapper = mount(
        <Provider store={ store }>
           <MemoryRouter>
           <RegisterScreen />
           </MemoryRouter>
        </Provider>);

        expect(wrapper.find('.auth__alert-error').exists()).toBeTruthy()
   });
   
   
    
});
