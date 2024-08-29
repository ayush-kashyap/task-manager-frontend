import { createContext,useContext } from "react";
import { useState } from "react";
import Axios from "axios";
const UserContext=createContext()

export const UserDetails=({children})=>{
    const [isLoggedIn, setLoggedIn] = useState(localStorage.getItem('token'))
    const [user, setUser] = useState()

    const getTask = async () => {
        var response = localStorage.getItem("token") ? true : false;
        if (response) {
            await Axios.get("https://task-manager-backend-ten-xi.vercel.app/task/read",  { headers: { "Authorization": localStorage.getItem("token") } }).then(
                (res) => {
                    response = res.data
                }
            ).catch((err) => {
                response = false
            })
        }
        return response
    };
    const getUser = async () => {
        var response = localStorage.getItem("token") ? true : false;
        if (response) {
            await Axios.get("https://task-manager-backend-ten-xi.vercel.app/get/user", { headers: { "Authorization": localStorage.getItem("token") } }).then(
                (res) => {
                    response = res.data
                }
            ).catch((err) => {
                response = false
            })
        }
        return response
    };
    const handleLogout=()=>{
        setLoggedIn(false)
        localStorage.removeItem('token')
    }

    return(
    <UserContext.Provider value={{getTask,handleLogout,isLoggedIn, setLoggedIn,getUser,user, setUser}}>
        {children}
    </UserContext.Provider>
    )
}

export function useMyOwnContext() {
    const UserContextValue = useContext(UserContext);
    if (!UserContextValue) {
        throw new Error("useAuth used outside");
    }
    return UserContextValue;
}