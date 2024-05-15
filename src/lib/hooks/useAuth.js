import AuthContext from "@/components/context/AuthContext";
import { useContext } from "react";

const useAuth = () => {
    return useContext(AuthContext)
}

export default useAuth

