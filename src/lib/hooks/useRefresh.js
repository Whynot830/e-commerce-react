import axios from "@/api/axios"
import useAuth from "./useAuth"

const useRefresh = () => {
    const { setAuth } = useAuth()

    const refresh = async () => {
        try {
            const response = await axios.post('/auth/refresh', null, {
                withCredentials: true
            })
            setAuth(prev => ({ ...prev, user: response.data }))
            return response.data
        }
        catch (err) {
            setAuth({})
        }
    }

    return refresh
}
export default useRefresh