// components/AuthGuard.jsx
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const getAuthState = () => {
    const { ...context } = useAuth();
    try {
        const token = context.userToken;
        const rawUser = context.userRole;
        console.log("AuthGuard - Retrieved token and userRole from context:", token, rawUser);

        let roles = [];

        if (rawUser) {
            console.log("Raw user data:", rawUser);
            // const parsed = JSON.parse(rawUser);
            // console.log("Parsed user roles:", parsed);
            // Support both: ["ROLE_USER"] and { roles: [...] }
            if (Array.isArray(rawUser)) {
                roles = rawUser;
            } else if (Array.isArray(rawUser.roles)) {
                roles = rawUser.roles;
            }
        }

        return {
            isAuthenticated: Boolean(token),
            roles,
        };
    } catch {
        return { isAuthenticated: false, roles: [] };
    }
};

/* ---------- Route rules ---------- */
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
    ].some((r) => path === r || path.startsWith(r + "/")) ||
    path.startsWith("/restaurant/");

const isAdminRoute = (path) =>
    path === "/admin" || path.startsWith("/admin/");

/* ---------- AuthGuard ---------- */
const AuthGuard = ({ children }) => {
    const { pathname } = useLocation();
    const { isAuthenticated, roles } = getAuthState();
    const navigate = useNavigate();

    const isUser = roles.includes("ROLE_USER");
    const isAdmin = roles.includes("ROLE_ADMIN");
    console.log("AuthGuard - isUser:", isUser, "isAdmin:", isAdmin, "isAuthenticated:", isAuthenticated, "pathname:", pathname);


    if (PUBLIC_ROUTES.includes(pathname)) {
        return children;
    }


    if (!isAuthenticated) {
        return (
            <Navigate to="/login" replace state={{ from: pathname }} />
        );
    }

    /* 3️⃣ Admin routes */
    if (isAdminRoute(pathname)) {
        return isAdmin ? children : <Navigate to="/unauthorized" replace />;
    }

    /* 4️⃣ User routes (admin allowed) */
    if (isUserRoute(pathname)) {
        return isUser || isAdmin
            ? children
            : <Navigate to="/unauthorized" replace />;
    }

    /* 5️⃣ Default deny */
    return <Navigate to="/unauthorized" replace />;
};

export default AuthGuard;
