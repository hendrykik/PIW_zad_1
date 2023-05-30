import { auth } from "./init";
import {
    FacebookAuthProvider,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import{ useState, useEffect } from "react";



const googleProvider = new GoogleAuthProvider();

export const logInWithGoogle = async () => {
    try {
        await signInWithPopup(auth, googleProvider);
    }catch(err) {
        console.error({ err });
        alert(err.message);
    }
};

const provider = new FacebookAuthProvider();

export const logInWithFacebook = async () => {
    signInWithPopup(auth, provider)
  .then((result) => {
    // The signed-in user info.
    const user = result.user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;

    // IdP data available using getAdditionalUserInfo(result)
    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);

    // ...
  });
};

export const useAuth = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe =
                auth.onAuthStateChanged((user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);
    return user;
};

export const logout = () => signOut(auth);