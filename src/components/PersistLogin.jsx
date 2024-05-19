import useAuth from "@/lib/hooks/useAuth";
import useLogout from "@/lib/hooks/useLogout";
import useRefresh from "@/lib/hooks/useRefresh";
import transition from "@/lib/transition";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Loader from "./Loader";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true)
    const refresh = useRefresh()
    const { auth, persist } = useAuth()
    const logout = useLogout()

    useEffect(() => {
        let isMounted = true
        const verifyRefreshToken = async () => {
            try {
                if (persist) {
                    await refresh()
                }
                else {
                    await logout()
                }
            } catch (err) {
                console.error(err)
            }
            finally {
                isMounted && transition(() => setIsLoading(false))
            }
        }
        !auth?.user
            ? verifyRefreshToken()
            : setIsLoading(false)

        return () => isMounted = false
    }, [])

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <Outlet />
            )}
        </>
    )
}

export default PersistLogin