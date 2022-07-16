
import { checkingCredentials, login, logout } from '../../../store/auth';
import { clearNotesLogout } from '../../../store/journal/journalSlice';
import {
  checkingAuthentication,
  startGoogleSignIn,
  startCreatingUserWithEmailPassword,
  startLoginWithEmailPassword,
  startLogout
} from './../../../store/auth/thunks';
import {
  singInWithGoogle,
  registerUserWithEmailPassword,
  loginWithEmailPassword,
  logoutFirebase,
} from '../../../firebase/providers';

import { userTest } from '../../fixtures/authFixture';

jest.mock('./../../../firebase/providers');

describe('thunk scenarios:::', () => {
  const dispatch = jest.fn();
  beforeEach(() => jest.clearAllMocks());

  it('should test thunk checkingAuthentication', async () => {
    await checkingAuthentication()(dispatch);
    expect(dispatch).toHaveBeenCalledWith( checkingCredentials());
  });

  it('should test thunk startGoogleSignIn success results', async () => {
    const loginInfo = { ok: true, ...userTest };
    await singInWithGoogle.mockResolvedValue(loginInfo);

    await startGoogleSignIn()(dispatch);
    expect(dispatch).toHaveBeenCalledWith( checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith( login(loginInfo))
    expect(dispatch).toHaveBeenCalledTimes(2);
  });

  it('should test thunk startGoogleSignIn failure results', async () => {
    userTest.errorMessage = 'someError';
    const loginInfo = { ok: false, ...userTest };
    await singInWithGoogle.mockResolvedValue(loginInfo);

    await startGoogleSignIn()(dispatch);
    expect(dispatch).toHaveBeenCalledWith( checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith( logout(userTest.errorMessage))
    expect(dispatch).toHaveBeenCalledTimes(2);
  });

  it('should test thunk startCreatingUserWithEmailPassword SUCCESS results', async () => {
    const registerUser = { email: 'test@gmail.com', password: 'pasw-test', displayName: 'user-prueba' };
    const registerResponse = { ok: true, ...userTest };
    await registerUserWithEmailPassword.mockResolvedValue(registerResponse);

    await startCreatingUserWithEmailPassword( registerUser )(dispatch);
    expect(dispatch).toHaveBeenCalledWith( checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith( login(registerResponse))
    expect(dispatch).toHaveBeenCalledTimes(2);
  });

  it('should test thunk startCreatingUserWithEmailPassword FAILURE results', async () => {
    const registerUser = { email: 'test@gmail.com', password: 'pasw-test', displayName: 'user-prueba' };
    const registerResponse = { ok: false, ...userTest };
    registerResponse.errorMessage =  'someError';
    await registerUserWithEmailPassword.mockResolvedValue(registerResponse);

    await startCreatingUserWithEmailPassword( registerUser )(dispatch);
    expect(dispatch).toHaveBeenCalledWith( checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith( logout(registerResponse.errorMessage))
    expect(dispatch).toHaveBeenCalledTimes(2);
  });

  it('should test thunk startLoginWithEmailPassword SUCCESS results', async () => {
    const registerUser = { email: 'test@gmail.com', password: 'pasw-test' };
    const registerResponse = { ok: true, ...userTest };
    delete registerResponse.errorMessage;
    await loginWithEmailPassword.mockResolvedValue(registerResponse);

    await startLoginWithEmailPassword( registerUser )(dispatch);
    expect(dispatch).toHaveBeenCalledWith( checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith( login(registerResponse))
    expect(dispatch).toHaveBeenCalledTimes(2);
  });

  it('should test thunk startCreatingUserWithEmailPassword FAILURE results', async () => {
    const registerUser = { email: 'test@gmail.com', password: 'pasw-test' };
    const registerResponse = { ok: false, ...userTest };
    registerResponse.errorMessage = 'someError';
    await loginWithEmailPassword.mockResolvedValue(registerResponse);

    await startLoginWithEmailPassword( registerUser )(dispatch);
    expect(dispatch).toHaveBeenCalledWith( checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith( logout(registerResponse))
    expect(dispatch).toHaveBeenCalledTimes(2);
  });

  it('should test thunk startLogout SUCCESS results', async () => {
    await logoutFirebase.mockResolvedValue();

    await startLogout( )(dispatch);
    expect(dispatch).toHaveBeenCalledWith( clearNotesLogout());
    expect(dispatch).toHaveBeenCalledWith( logout())
    expect(dispatch).toHaveBeenCalledTimes(2);
  });
 })