import useViewNavigate from "@/lib/hooks/viewNavigate";
import { Link, Navigate, useLocation } from "react-router-dom";

const ViewTransitionLink = ({ to, children, options, disabled = false }) => {
    const navigate = useViewNavigate()
    const location = useLocation()
    return (
        <Link
            className={disabled ? 'pointer-events-none opacity-70' : ''}
            href={to}
            onClick={(ev) => {
                ev.preventDefault();
                if (to != location.pathname)
                    navigate(to, options)
            }}
        >
            {children}
        </Link>
    );
};

export default ViewTransitionLink