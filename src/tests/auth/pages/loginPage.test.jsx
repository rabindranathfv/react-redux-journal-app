import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { Provider, useDispatch } from 'react-redux';
import { authSlice } from "../../../store/auth";
import { startGoogleSignIn } from "../../../store/auth/thunks";

import { LoginPage } from "../../../auth/pages/LoginPage";
import { notAuthenticated } from "../../fixtures/authFixture";

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock('../../../store/auth/thunks', () => ({
  startGoogleSignIn: () => mockStartGoogleSignIn,
  startLoginWithEmailPassword: ({ email, password }) => {
    return () => mockStartLoginWithEmailPassword({ email, password })
  }
}))

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => (fn) => fn()
}))

startGoogleSignIn
const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  },
  preloadedState: {
    auth: notAuthenticated
  }
});

describe('Unit test for LoginPage:::::', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  })

  it('should render properly loginPage', () => {
    render(
        <Provider store={store}>
          <MemoryRouter>
            <LoginPage />
          </MemoryRouter>
        </Provider>
      )
      expect( screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
  });

  it('should signIn btn call function onGoogleSignIn', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    )

    const googleBtn = screen.getAllByLabelText('google-btn');
    fireEvent.click(googleBtn['0']);
    expect(mockStartGoogleSignIn).toHaveBeenCalled();
   })

   it('should signIn btn call function onGoogleSignIn', () => {

    const emailMock = "test@gmail.com";
    const passwordMock = '123456';
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    )

    const emailInput = screen.getByRole('textbox', {name: 'Correo'});
    fireEvent.change(emailInput, {target: { name: 'email', value: emailMock }});

    const pswdInput = screen.getByTestId('password', {name: 'Contraseña'});
    fireEvent.change(pswdInput, {target: { name: 'password', value: passwordMock }});

    const formLogin = screen.getAllByLabelText('submit-form')
    fireEvent.submit( formLogin['0'] )

    expect(mockStartLoginWithEmailPassword).toHaveBeenCalled();
    expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({ email: emailMock, password: passwordMock});
   })

   it('should render create acount link', () => {
    render(
        <Provider store={store}>
          <MemoryRouter>
            <LoginPage />
          </MemoryRouter>
        </Provider>
      )

      const redirectCreateAccount = screen.getByRole('link');
      expect(redirectCreateAccount).toBeDefined();
      expect(redirectCreateAccount.href.search('/auth/register')).toBeGreaterThan(-1);
  });
});