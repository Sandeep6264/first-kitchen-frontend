// components/AuthGuard.jsx
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const getAuthState = () => {
    const { ...context } = useAuth();
    try {
        const token = context.userToken;
        const rawUser = context.userRole;
        console.log("AuthGuard - Token:", token);
        console.log("AuthGuard - User Roles:", rawUser);


        const roles = rawUser ? (Array.isArray(rawUser) ? rawUser : [rawUser]) : [];


        return {
            isAuthenticated: Boolean(token),
            roles,
        };
    } catch {
        return { isAuthenticated: false, roles: [] };
    }
};

const PUBLIC_ROUTES = [
    "/",
    "/login",
    "/register",
    "/forgot-password",
    "/unauthorized",
];

const isUserRoute = (path) =>
    [
        "/home",
        "/cart",
        "/myorders",
        "/offers",
        "/checkout",
        "/livetracking",
        "/payment",
        "/usermanagement"
    ].some((r) => path === r || path.startsWith(r + "/")) ||
    path.startsWith("/restaurant/");

const isAdminRoute = (path) =>
    path === "/admin" || path.startsWith("/admin/");

const AuthGuard = ({ children }) => {
    const { pathname } = useLocation();
    console.log("AuthGuard - Current Path:", pathname);
    const { isAuthenticated, roles } = getAuthState();

    const isUser = roles.includes("ROLE_USER");
    const isAdmin = roles.includes("ROLE_ADMIN");

    if (PUBLIC_ROUTES.includes(pathname)) {
        return children;
    }


    if (!isAuthenticated) {
        return (
            <Navigate to="/login" replace state={{ from: pathname }} />
        );
    }

    if (isAdminRoute(pathname)) {
        return isAdmin ? children : <Navigate to="/unauthorized" replace />;
    }
    if (isUserRoute(pathname)) {
        return isUser || isAdmin
            ? children
            : <Navigate to="/unauthorized" replace />;
    }

    return <Navigate to="/unauthorized" replace />;
};

export default AuthGuard;
