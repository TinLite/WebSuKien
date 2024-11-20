// import { getProfile } from "@/repository/user-repository";
import React, { useEffect } from "react";

// Cũng như useState, createContext nhận vào một giá trị mặt định,
export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = React.useState();
    useEffect(() => {
        
    }, []);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}