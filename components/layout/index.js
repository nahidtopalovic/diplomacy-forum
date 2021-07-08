import Header from './header';
import { useAuth } from '../../context/AuthUserContext';

const Layout = ({ children }) => {
    const { authUser } = useAuth();
    return (
        <div>
            <Header />
            {authUser ? (
                <div>{authUser.email} signed in!</div>
            ) : (
                'Not logged in'
            )}
            {children}
        </div>
    );
};

export default Layout;
