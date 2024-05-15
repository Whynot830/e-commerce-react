import axios from "@/api/axios"

const useLogout = () => {
    const logout = async () => {
        try {
            await axios.post('/auth/logout', null, {
                withCredentials: true
            })
        } catch (err) {
            console.error(err);
        } 
    }

    return logout
}

export default useLogout