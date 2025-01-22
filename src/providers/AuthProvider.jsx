import { 
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    signOut, 
    updateProfile, 
    GoogleAuthProvider,
    FacebookAuthProvider
} from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../firebase/firebase.config';
import useAxiosPublic from '../hooks/useAxiosPublic';


export const AuthContext = createContext(null);
const axiosPublic = useAxiosPublic();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
        setLoading(true);
        return signOut(auth);
    };

    const userUpdateData = (name, photoURL) => {
        setLoading(true);
        return updateProfile(auth.currentUser, { displayName: name, photoURL });
    };

    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            setLoading(true);
            const result = await signInWithPopup(auth, provider);
            return result;
        } catch (error) {
            console.error('Google Sign-In Error:', error);
            setLoading(false);
            throw error; 
        }
    };

    const facebookProvider = new FacebookAuthProvider();
    const facebookSignIn = () =>{
        setLoading(true);

        return signInWithPopup(auth, facebookProvider);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if(currentUser){
                // get token and assign client side
                const userInfo = {email : currentUser.email};
                axiosPublic.post('/jwt', userInfo)
                .then(res =>{
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token)
                    }
                })
            }
            else{
                // do something : remove token
                localStorage.removeItem('access-token')
            }
            setLoading(false);
        });

        return () => unSubscribe();
    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logout,
        userUpdateData,
        googleSignIn,
        facebookSignIn
    };

    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
