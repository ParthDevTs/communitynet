import { Navigate, useLocation } from "react-router";
import { useAuthContext } from "../context/AuthContext";

export function RequiresAuth({ children }) {
    let location = useLocation();
    const { isLoggedIn } = useAuthContext();

    return isLoggedIn ? (
        children
    ) : (
        <Navigate to="/login" state={{ from: location }} />
    );
}