import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [userName, setuserName] = useState(null);
    const [loader, setloader] = useState(false);
    const [itemCount, setitemCount] = useState(0);
    const [items, setItems] = useState([]);
    const [userRole, setUserRole] = useState([]);
    const [userToken, setUserToken] = useState(null);
    const [userId, setuserId] = useState(null);
    const [userEmail, setuserEmail] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem('firstKitchenCart');
        return saved ? JSON.parse(saved) : [];
    });
    return (
        <AuthContext.Provider value={{
            userName, setuserName, loader, setloader, itemCount, setitemCount, items, setItems, userId, setuserId, userEmail, setuserEmail,
            cart, setCart, userRole, setUserRole, userToken, setUserToken,isLoggedIn, setIsLoggedIn
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);