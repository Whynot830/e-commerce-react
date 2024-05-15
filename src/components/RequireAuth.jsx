import useAuth from "@/lib/hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = () => {
    const { auth } = useAuth()
    const location = useLocation()
    return (
        auth?.user
            ? <Outlet />
            : <Navigate to='/login' state={{ from: location }} replace />
    )
}

export default RequireAuth