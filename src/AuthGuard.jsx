// components/AuthGuard.jsx
import { Navigate, useLocation } from "react-router-dom";

/* ---------- Auth reader (defensive) ---------- */
const getAuthState = () => {
    try {
        const token = localStorage.getItem("token");
        const rawUser = localStorage.getItem("user");

        let roles = [];

        if (rawUser) {
            const parsed = JSON.parse(rawUser);

            // Support both: ["ROLE_USER"] and { roles: [...] }
            if (Array.isArray(parsed)) {
                roles = parsed;
            } else if (Array.isArray(parsed.roles)) {
                roles = parsed.roles;
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

    const isUser = roles.includes("ROLE_USER");
    const isAdmin = roles.includes("ROLE_ADMIN");

    /* 1️⃣ Public routes */
    if (PUBLIC_ROUTES.includes(pathname)) {
        return children;
    }

    /* 2️⃣ Not logged in */
    if (!isAuthenticated) {
        return (
            <Navigate
                to={`/login?redirect=${encodeURIComponent(pathname)}`}
                replace
            />
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
