import { useForm, SubmitHandler } from "react-hook-form";
import { Irequestreset } from "../../types";
import { RequestPasswordReset } from "../../utils/APIRequests";
const RequestResetForm = () => {
    const {register, handleSubmit, reset, formState: {errors, isSubmitting}} = useForm<Irequestreset>();

    const onSubmit: SubmitHandler<Irequestreset> = async (data) => {
        const res = await RequestPasswordReset(data);
        reset();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="border flex flex-col p-5 items-center w-80 h-60 rounded-md gap-5 shadow-md">
            <div className="text-center">
                <h1 className="font-extrabold text-4xl text-center font-sofadi">Petsgram</h1>
                <h3 className="text-lg text-gray-500">Request Password Reset</h3>
            </div>
            <div className="w-full">
                <input {...register("email", {required: "Email Required"})} placeholder="Email" type="email" className={`border w-full h-10 rounded-sm p-1  ${errors.email ? "outline-red-600 border-red-600" : "outline-gray-300"}`} />
                {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
            </div>
            <button className={` text-white font-medium w-full py-2 rounded-sm ${isSubmitting ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500"}`}>{isSubmitting ? "Submitting" : "Request Reset"}</button>
        </form>
    )
}

export default RequestResetForm;