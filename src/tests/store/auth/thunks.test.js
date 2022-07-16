
import { checkingCredentials, login } from '../../../store/auth';
import { checkingAuthentication, startGoogleSignIn } from './../../../store/auth/thunks';
import { singInWithGoogle } from '../../../firebase/providers';

import { userTest } from '../../fixtures/authFixture';

jest.mock('./../../../firebase/providers')
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
 })