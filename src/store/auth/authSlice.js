import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'not-authenticated', // checking, 
  uid: null,
  email: null,
  displayName: null,
  picUrl: null,
  errorMessage: null
}

export const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    login: (state, action) => {

    },
    logout: (state, payload) => {

    },
    checkingCredentials: (state) => {
      state.status = 'checking';
    }
  },
});

export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials(email, password))
  }
}

export const startGoogleSignIn = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials(email, password))
  }
}

// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = AuthSlice.actions