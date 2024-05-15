import { useContext, useEffect } from "react"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import AuthContext from "./context/AuthContext"

const Protected = ({ children }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const { loggedIn } = useContext(AuthContext)
    useEffect(() => {
        if (loggedIn && location.pathname === '/auth')
            navigate('/')
        if (!loggedIn && location.pathname !== '/auth') {
            console.log('redirecting to');
            console.log(location.pathname);
            navigate('/auth')
        }

    }, [loggedIn, location, navigate])
    return <>{children}</>
}

export default Protected