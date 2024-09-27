import { useForm, SubmitHandler } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { Ipasswordreset } from "../../types";
import { ResetNewPassword } from "../../utils/APIRequests";
import { AxiosResponse, isAxiosError } from "axios";
import { useState } from "react";

const PasswordResetForm = () => {
    const {register, watch, handleSubmit, setError, formState: {errors, isSubmitting}} = useForm<Ipasswordreset>();
    const password = watch("password");
    const {uidb64, token} = useParams();
    const [success, setIsSuccess] = useState<string>("");
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<Ipasswordreset> = async (data) => {
        try {
            data["token"] = token;
            data["uidb64"] = uidb64;
            const res: AxiosResponse = await ResetNewPassword(data);
            setIsSuccess(res?.data?.detail);
            setTimeout(() => {
                navigate("/login");
            }, 1000)
        } catch (error) {
            if (isAxiosError(error)) {
                setError("root", {message: error?.response?.data?.detail});
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="border flex flex-col p-5 items-center w-96 h-80 rounded-md gap-4 shadow-md">
            <div className="text-center">
                <h1 className="font-extrabold text-4xl text-center font-sofadi">Petsgram</h1>
                <h3 className="text-gray-500 text-lg">Reset Password</h3>
            </div>
            {success && <p className="border py-1 bg-green-200 text-green-600 w-full rounded-sm px-1 text-center">Success</p>}
            {errors.root && <p className="border py-1 bg-red-200 text-red-600 w-full rounded-sm px-1 text-center">{errors.root.message}</p>}
            <div className="w-full">
                <input {...register("password", {
                    required: "Password Required",
                    minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long",
                      }
                    })} placeholder="Password" type="password" className={`border w-full h-10 rounded-sm p-1  ${errors.password ? "outline-red-600 border-red-600" : "outline-gray-300"}`} />
                {errors.password && <p className="text-xs text-red-600">{errors.password.message}</p>}
            </div>
            <div className="w-full">
                <input {...register("confirmPassword", {
                    required: "Password Required",
                    validate: (value) => value === password || "Passwords do not match"
                })} 
                    placeholder="Confirm Password" type="password" className={`border w-full h-10 rounded-sm p-1  ${errors.confirmPassword ? "outline-red-600 border-red-600" : "outline-gray-300"}`} />
                {errors.confirmPassword && <p className="text-xs text-red-600">{errors.confirmPassword.message}</p>}
            </div>
            <button className={` text-white font-medium w-full py-2 rounded-sm ${isSubmitting ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500"}`}>{isSubmitting ? "Submitting" : "Reset Password"}</button>
        </form>
    )
}

export default PasswordResetForm;