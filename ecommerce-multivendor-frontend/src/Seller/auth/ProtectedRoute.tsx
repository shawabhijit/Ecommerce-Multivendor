// components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAppSelecter } from '../../app/Store';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isLoggedIn, loading } = useAppSelecter((state) => state.sellers);

    // Show loading indicator while checking auth status
    if (loading) {
        return <div>Loading...</div>;
    }

    // Redirect to login if not authenticated
    if (!isLoggedIn) {
        return <Navigate to="/seller/login" replace />;
    }

    // Render children if authenticated
    return <>{children}</>;
};