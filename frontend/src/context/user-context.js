// import { getProfile } from "@/repository/user-repository";
import React, { useEffect } from "react";
import { getProfile } from "../repositories/UserRepository";

// Cũng như useState, createContext nhận vào một giá trị mặt định,
export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = React.useState();
    useEffect(() => {
        getProfile().then((response) => {
            setUser(response.data);
        }).catch((error) => {
            if (error.response) {
                console.log(error.response.data);
            } else {
                console.log(error.message);
            }
        });
    }, []);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}