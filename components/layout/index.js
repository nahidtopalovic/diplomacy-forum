import Header from './header';
import { useAuth } from '../../context/AuthUserContext';

const Layout = ({ children }) => {
    const { authUser } = useAuth;
    console.log(authUser);
    return (
        <div>
            <Header />
            {authUser ? <div>{authUser} signed in!</div> : 'Not logged in'}
            {children}
        </div>
    );
};

export default Layout;
