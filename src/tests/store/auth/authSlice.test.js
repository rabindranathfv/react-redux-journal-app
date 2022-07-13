
import { initialState } from '../../fixtures/authFixture';
import { authSlice } from './../../../store/auth/authSlice';

describe('authSlice scenarios:::::', () => {
  it('should load initialState', () => {
    const state = authSlice.reducer(initialState, {});
    expect(authSlice.name).toBe('auth');
    expect( state ).toEqual(initialState);
  });
});