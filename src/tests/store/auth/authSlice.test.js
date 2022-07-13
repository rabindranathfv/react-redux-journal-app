
import { authenticaed, initialState, userTest } from '../../fixtures/authFixture';
import { authSlice, login, logout, checkingCredentials } from './../../../store/auth/authSlice';
import { notAuthenticaed, checking } from './../../fixtures/authFixture';

describe('authSlice scenarios:::::', () => {
  it('should load initialState', () => {
    const state = authSlice.reducer(initialState, {});
    expect(authSlice.name).toBe('auth');
    expect( state ).toEqual(initialState);
  });

  it('should make login succesfully', () => {
    const state = authSlice.reducer(initialState, login(userTest));
    expect(state).toEqual(authenticaed);
  });

  it('should make logout succesfully', () => {
    const state = authSlice.reducer(initialState, logout());
    expect(state).toEqual(notAuthenticaed);
  });

  it('should make checkingCredentials succesfully', () => {
    const state = authSlice.reducer(initialState, checkingCredentials(userTest));
    expect(state.status).toEqual('checking');
  });
});