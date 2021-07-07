import { useState, useEffect } from 'react';
import { auth } from '../db/firebase';
import {
    removeUserCookie,
    setUserCookie,
    getUserFromCookie,
} from './userCookie';
import { useRouter } from 'next/router';

export const mapUserData = async (user) => {
    const { uid, email } = user;
    const token = await user.getIdToken(true);
    return {
        id: uid,
        email,
        token,
    };
};

export default function useFirebaseAuth() {
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const logout = () => {
        return auth
            .signOut()
            .then(() => {
                router.push('/');
            })
            .catch((error) => {
                console.error(error);
            });
    };

    // listen for Firebase state change
    useEffect(() => {
        const unsubscribe = auth.onIdTokenChanged(async (userToken) => {
            if (userToken) {
                setLoading(true);
                const userData = await mapUserData(userToken);

                setUserCookie(userData);
                setAuthUser(userData);
                setLoading(false);
            } else {
                setLoading(false);
                removeUserCookie();
                setAuthUser();
            }
        });

        const userFromCookie = getUserFromCookie();
        if (!userFromCookie) {
            return;
        }

        setUserCookie(userFromCookie);
        return () => unsubscribe();
    }, []);

    return {
        authUser,
        loading,
        logout,
    };
}
