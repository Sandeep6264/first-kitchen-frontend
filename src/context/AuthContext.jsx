import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {

    const [userName, setuserName] = useState(sessionStorage.getItem("userName") || null);
    const [loader, setloader] = useState(false);
    const [itemCount, setitemCount] = useState(0);
    const [items, setItems] = useState([]);
    const [userRole, setUserRole] = useState(sessionStorage.getItem("userRole") || null);
    const [userToken, setUserToken] = useState(sessionStorage.getItem("userToken") || null);
    const [userId, setuserId] = useState(sessionStorage.getItem("userId") || null);
    const [userEmail, setuserEmail] = useState(sessionStorage.getItem("userEmail") || null);
    const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem("isLoggedIn") === "true");
    const [orders, setOrders] = useState([]);
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem('firstKitchenCart');
        return saved ? JSON.parse(saved) : [];
    });
   
    return (
        <AuthContext.Provider value={{
            userName, setuserName, loader, setloader, itemCount, setitemCount, items, setItems, userId, setuserId, userEmail, setuserEmail,
            cart, setCart, userRole, setUserRole, userToken, setUserToken, isLoggedIn, setIsLoggedIn, orders, setOrders
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);