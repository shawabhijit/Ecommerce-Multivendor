import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelecter } from '../../../../app/Store'
import { checkAuthStatus } from '../../../../app/authSlice/CustomerAuthSlice';

const AuthChecker = ({ children }) => {
    const dispatch = useAppDispatch();
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
            dispatch(checkAuthStatus());
        }, 10 * 60 * 1000); 
        return () => clearInterval(interval);
    }, [dispatch]);

    if (isChecking) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
}

export default AuthChecker;