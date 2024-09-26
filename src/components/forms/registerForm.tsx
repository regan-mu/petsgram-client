import {useForm, SubmitHandler} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { RegisterInputs } from "../../types";
import { registerFormSchema } from "../../zodSchemas";
import API from "../../utils/axiosConfig";

const RegisterForm = () => {
    const {register, handleSubmit, setError, formState: {errors, isSubmitting}} = useForm<RegisterInputs>({resolver: zodResolver(registerFormSchema)});
    const navigate = useNavigate();

    const onSubmit:SubmitHandler<RegisterInputs> = async (data) => {
        try {
            const res:AxiosResponse = await API.post("/user", data);
            navigate("/login");
        } catch(err) {
            if (axios.isAxiosError(err)) {
                setError("root", {message: err?.response?.data?.email || err?.response?.data?.username});
            }
        };
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full h-auto gap-3">
            {errors.root && <div className="text-red-500 text-center text-xs p-2 rounded-sm w-full bg-red-100">{errors.root.message}</div>}
            <div className="flex flex-col gap-1">
                <input {...register("email")} className={`border p-2 rounded-sm outline-gray-300 w-full ${errors.email && "border-red-500 outline-red-500"}`} name="email" placeholder="Email" />
                {errors.email && <div className="text-red-500 text-xs">{errors.email.message}</div>}
            </div>
            <div className="flex flex-col gap-1">
                <input {...register("username")} className={`border p-2 rounded-sm outline-gray-300 w-full ${errors.username && "border-red-500 outline-red-500"}`} name="username" placeholder="Username" type="text" />
                {errors.username && <div className="text-red-500 text-xs">{errors.username.message}</div>}
            </div>
            <div className="flex flex-col gap-1">
                <select {...register("gender")} className={`border p-2 rounded-sm outline-gray-300 w-full ${errors.gender && "border-red-500 outline-red-500"}`} name="gender">
                    <option value="">--Select Gender--</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                {errors.gender && <div className="text-red-500 text-xs">{errors.gender.message}</div>}
            </div>
            <div className="flex flex-col gap-1">
                <input {...register("password")} className={`border p-2 rounded-sm outline-gray-300 w-full ${errors.password && "border-red-500 outline-red-500"}`} name="password" placeholder="Password" type="password" />
                {errors.password && <div className="text-red-500 text-xs">{errors.password.message}</div>}
            </div>
            <button disabled={isSubmitting} className={`text-white  py-2 rounded-sm ${isSubmitting ? 'bg-blue-400': 'bg-blue-500'}`} type="submit">{isSubmitting ? "Loading..." : "Register"}</button>
        </form>
    )
}

export default RegisterForm;