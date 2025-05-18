import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelecter } from '../../../../app/Store'
import { checkAuthStatus } from '../../../../app/authSlice/CustomerAuthSlice';
import LoadingPage from '../../../../Components/Pages/LoadingPage';

const AuthChecker = ({ children }) => {
    const dispatch = useAppDispatch();
    const { isLoggedIn, authChecked } = useAppSelecter(state => state.customers);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await dispatch(checkAuthStatus()).unwrap();
            } catch (error) {
                console.log('Auth check failed:', error);
            } finally {
                setIsChecking(false);
            }
        };

        checkAuth();

        const interval = setInterval(() => {
            if (isLoggedIn) {
                dispatch(checkAuthStatus());
            }
        }, 10 * 60 * 1000); 
        return () => clearInterval(interval);
    }, [dispatch , isLoggedIn]);

    if (!authChecked || isChecking) {
        return <LoadingPage />;
    }

    return <>{children}</>;
}

export default AuthChecker;