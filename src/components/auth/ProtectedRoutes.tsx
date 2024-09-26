import React, { ReactNode, useState, useEffect } from "react";
import { AxiosResponse } from "axios";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";
import API from "../../utils/axiosConfig";
import { ComponentProp, JwtPayload } from "../../types";


const ProtectedRoutes: React.FC<ComponentProp> = ({children}) => {
    const [authorized, setAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        auth().catch(error => {
            setAuthorized(false);
            return error;
        });
    }, []);

    const refreshToken = async () => {
        const token: string | null = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res: AxiosResponse = await API.post("/token/refresh", {"refresh": token});
            if (res.status === 200) {
                localStorage.setItem(REFRESH_TOKEN, res?.data?.refresh);
                localStorage.setItem(ACCESS_TOKEN, res?.data?.access);
                setAuthorized(true);
            } else {
                setAuthorized(false);
            }
        }
        catch(error) {
            setAuthorized(false);
            return error;
        }
    }

    const auth = async () => {
        const token: string | null = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setAuthorized(false);
            return;
        }
        const tokenDecode:JwtPayload = jwtDecode(token);
        const now: number = Date.now() / 1000;
        localStorage.setItem("user", tokenDecode?.user_id)
        if (now > tokenDecode.exp) {
            await refreshToken();
        } else {
            setAuthorized(true);
        }
    }
    if (authorized === null) {
        return <div className="w-full h-screen flex justify-center items-center">Loading...</div>
    }
    return authorized ? <>{children}</> : <Navigate to="/login" />
}

export default ProtectedRoutes;