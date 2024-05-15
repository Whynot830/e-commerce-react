import useAuth from "@/lib/hooks/useAuth";
import useRefresh from "@/lib/hooks/useRefresh";
import transition from "@/lib/transition";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import useLogout from "@/lib/hooks/useLogout";

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
                <div className="absolute inset-0 bottom-20 flex justify-center items-center">
                    <LoaderCircle className="animate-spin h-1/6 w-1/6" />
                </div>
            ) : (
                <Outlet />
            )}
        </>
    )
}

export default PersistLogin