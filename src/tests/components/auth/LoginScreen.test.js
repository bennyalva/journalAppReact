import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { startGoogleLogin, startLoginEmailPassWord } from '../../../actions/auth';
const { mount } = require("enzyme");
const { LoginScreen } = require("../../../components/auth/LoginScreen");

jest.mock('../../../actions/auth', () => (
    {
        startGoogleLogin: jest.fn(),
        startLoginEmailPassWord: jest.fn()
    }))

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
store.dispatch = jest.fn(); // para manejar los dispatch del store

const wrapper = mount(
    <Provider store={ store }>
        <MemoryRouter>
        <LoginScreen />
        </MemoryRouter>
    </Provider>);

describe('Test on LoginScreen', () => {
    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks();// reiniciar mocks
    });
    test('should show correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('should call startGoogleLogin', () => {
        wrapper.find('.google-btn').prop('onClick')();
        expect(startGoogleLogin).toHaveBeenCalled();

    });
    test('should call startLogin with correct arguments', () => {
        wrapper.find('form').prop('onSubmit')({
            preventDefault: () => {}
        });
        expect(startLoginEmailPassWord).toHaveBeenCalledWith('benny@gmail.com',
        '123456');

    })
    
    
    
});
