import { createSlice } from '@reduxjs/toolkit';
import { signIgWithGoogle } from '/src/firebase/provider';

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
    login: (state, { payload }) => {
      state.status = 'authenticated'; // checking,
      state.uid = payload.uid;
      state.email = payload.email;
      state.displayName = payload.displayName;
      state.picUrl = payload.photoURL;
      state.errorMessage = null;
    },
    logout: (state, { payload }) => {
      state.status = 'not-authenticated'; // checking,
      state.uid = null;
      state.email = null;
      state.displayName = null;
      state.picUrl = null;
      state.errorMessage = payload.errorMessage | null;
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
    dispatch(checkingCredentials(email, password));
    const signG = await signIgWithGoogle();
    console.log("🚀 ~ file: authSlice.js ~ line 40 ~ return ~ signG", signG)
    if (!signG.ok) {
      dispatch(logout(signG.errorMsg))
    }

    dispatch(login(signG))

  }
}

// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = AuthSlice.actions