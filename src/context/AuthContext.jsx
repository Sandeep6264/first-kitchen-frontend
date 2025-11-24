import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [userName, setuserName] = useState(null);
    const [loader, setloader] = useState(false);
    const [itemCount, setitemCount] = useState(0);
    const [items, setItems] = useState([]);
    const [userId, setuserId] = useState(null);
    const [userEmail, setuserEmail] = useState(null);
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem('firstKitchenCart');
        return saved ? JSON.parse(saved) : [];
    });
    return (
        <AuthContext.Provider value={{ userName, setuserName, loader, setloader, itemCount, setitemCount, items, setItems, userId, setuserId, userEmail, setuserEmail, cart, setCart }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);