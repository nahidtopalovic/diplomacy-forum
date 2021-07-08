import { createContext, useContext } from 'react';
import useFirebaseAuth from '../utils/auth/useFirebaseAuth';

const authUserContext = createContext();

export function AuthUserProvider({ children }) {
    const auth = useFirebaseAuth();
    return (
        <authUserContext.Provider value={auth}>
            {children}
        </authUserContext.Provider>
    );
}
// custom hook to use the authUserContext and access authUser and loading
export const useAuth = () => useContext(authUserContext);
