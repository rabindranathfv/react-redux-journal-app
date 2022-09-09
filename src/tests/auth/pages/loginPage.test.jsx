import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { Provider } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../../../store/auth";

import { LoginPage } from "../../../auth/pages/LoginPage";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  },
  // preloadedState: {

  // }
});

describe('Unit test for LoginPage:::::', () => {

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
});