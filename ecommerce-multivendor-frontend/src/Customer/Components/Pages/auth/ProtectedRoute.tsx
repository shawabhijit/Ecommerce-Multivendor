import { useEffect } from 'react'
import { useAppSelecter } from '../../../../app/Store'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const ProtectedRoute = () => {
    const { isLoggedIn, loading } = useAppSelecter((state) => state.customers);
    const location = useLocation();

    useEffect(() => {
        console.log('Protected route check - isLoggedIn:', isLoggedIn);
    }, [isLoggedIn]);

    if (loading) {
        return <div>Authenticating...</div>;
    }

    if (!isLoggedIn) {
        return <Navigate to="/" state={{ from: location.pathname }} replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;