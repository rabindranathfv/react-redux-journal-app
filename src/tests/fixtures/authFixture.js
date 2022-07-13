export const initialState= {
  status: 'checking', // 'checking', 'not-authenticated', 'authenticated'
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
}

export const authenticaed= {
  status: 'authenticated', // 'checking', 'not-authenticated', 'authenticated'
  uid: 'valid-uid',
  email: 'test@gmail.com',
  displayName: 'user-prueba',
  photoURL: 'some-pic-url',
  errorMessage: null,
}

export const notAuthenticaed= {
  status: 'not-authenticated', // 'checking', 'not-authenticated', 'authenticated'
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
}

export const userTest = {
  uid: 'valid-uid',
  email: 'test@gmail.com',
  displayName: 'user-prueba',
  photoURL: 'some-pic-url',
}