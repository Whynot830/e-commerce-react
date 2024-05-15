import { useLocation, useNavigate } from "react-router-dom";
import transition from "../transition";
import { flushSync } from "react-dom";
import { useEffect } from "react";

const useViewNavigate = () => {
    const navigate = useNavigate()
    return (to, options = {}) => {
        transition(() => {
            flushSync(() => {
                navigate(to, options)
            })
        })
    }
}

export default useViewNavigate
