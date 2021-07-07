import { useAuth } from '../context/AuthUserContext';

const Private = () => {
    const { authUser, logout } = useAuth();

    return (
        <div>
            <div>Private</div>
            {authUser?.email && (
                <div>
                    <div>Email: {authUser.email}</div>
                    <button onClick={() => logout()}>Logout</button>
                </div>
            )}
        </div>
    );
};

export default Private;
