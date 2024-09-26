import {useForm, SubmitHandler} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosResponse, isAxiosError } from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { LoginInputs } from "../../types";
import { loginFormSchema } from "../../zodSchemas";
import API from "../../utils/axiosConfig";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../../types";

const LoginForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {register, setError, handleSubmit, formState: {errors, isSubmitting}} = useForm<LoginInputs>(
        {resolver: zodResolver(loginFormSchema)}
    );

    const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
        const from = location?.state?.from?.pathname;
        try {
            const res: AxiosResponse = await API.post("/token", data);
            localStorage.setItem(ACCESS_TOKEN, res?.data?.access);
            localStorage.setItem(REFRESH_TOKEN, res?.data?.refresh);
            
            const tokenDecode:JwtPayload = jwtDecode(res?.data?.access);
            localStorage.setItem("user", tokenDecode?.user_id)

            navigate(from || "/");
        } catch(err) {
            if (isAxiosError(err)) {
                setError("root", {message: err?.response?.data?.detail});
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full h-auto gap-3">
            {errors.root && <div className="text-red-500 text-center text-xs p-2 rounded-sm w-full bg-red-100">{errors.root.message}</div>}
            <div className="flex flex-col gap-1">
                <input {...register("email")} className={`border p-2 rounded-sm outline-gray-300 w-full ${errors.email && "border-red-500 outline-red-500"}`} name="email" placeholder="Email" />
                {errors.email && <div className="text-red-500 text-xs">{errors.email.message}</div>}
            </div>
            <div className="flex flex-col gap-1">
                <input {...register("password")} className={`border p-2 rounded-sm outline-gray-300 w-full ${errors.password && "border-red-500 outline-red-500"}`} name="password" placeholder="Password" type="password" />
                {errors.password && <div className="text-red-500 text-xs">{errors.password.message}</div>}
            </div>
            <button disabled={isSubmitting} className={`text-white  py-2 rounded-sm ${isSubmitting ? 'bg-blue-400': 'bg-blue-500'}`} type="submit">{isSubmitting ? "Loading..." : "Register"}</button>
        </form>
    )
}

export default LoginForm;