import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FirebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();

export const signIgWithGoogle = async () => {
  try {
    const fbResp = await signInWithPopup(FirebaseAuth, googleProvider);
    const { displayName, uid, email, photoURL } = fbResp.user;

    return {
      ok: true,
      displayName,
      uid,
      email,
      photoURL
    }
  } catch (error) {
    const errorCode = error.code;
    const errorMsg = error.message;
    return {
      ok: false,
      errorCode,
      errorMsg
    }
  }
}