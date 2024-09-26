import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateInputs, User } from "../../types";
import { profileUpdateFormSchema } from "../../zodSchemas";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SingleUser } from "../../utils/APIRequests";
import { UpdateUserInfo } from "../../utils/APIRequests";

const UpdateInfo: React.FC = () => {
    const {register, handleSubmit, setValue, formState: {errors, isSubmitting} } = useForm<UpdateInputs>({resolver: zodResolver(profileUpdateFormSchema)});
    const queryClient = useQueryClient();
    const {id} = useParams();
    const {data} = useQuery<UpdateInputs>({
        queryKey: ["retrieve_user"],
        queryFn: () => SingleUser(id)
    });

    if (data) {
        setValue("username", data?.username);
        setValue("email", data?.email);
        setValue("bio", data?.bio);
        setValue("gender", data?.gender);
    }

    // Data Mutation
    const {mutateAsync: updateUserMutation} = useMutation(
        {
         mutationFn: UpdateUserInfo,
         mutationKey: ["updateUserInfo"],
         onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["retrieve_user"]});
            queryClient.invalidateQueries({queryKey: ["retrieve_user_avatar"]});
         }
        }
    );

    const onSubmit: SubmitHandler<UpdateInputs> = async (data) => {
        await updateUserMutation(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 w-[30rem] border p-5 rounded-md">
            {/* Username */}
            <div>
                <label className="block text-sm font-semibold text-gray-700">Username</label>
                <input
                    type="text"
                    {...register('username')}
                    className={`border p-2 rounded-md text-gray-600 outline-gray-300 w-full ${errors.username && "border-red-500 outline-red-500"}`}
                />
                {errors.username && (
                    <p className="text-sm text-red-600 mt-1">{errors.username.message}</p>
                )}
            </div>

            {/* Email */}
            <div>
                <label className="block text-sm font-semibold text-gray-700">Email</label>
                <input
                    type="email"
                    {...register('email')}
                    className={`border p-2 text-gray-600 rounded-md outline-gray-300 w-full ${errors.email && "border-red-500 outline-red-500"}`}
                />
                {errors.email && (
                    <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                )}
            </div>

            {/* Gender */}
            <div>
                <label className="block text-sm font-semibold text-gray-700">Gender</label>
                <select
                    {...register('gender')}
                    className={`border p-2 text-gray-600 rounded-md outline-gray-300 w-full ${errors.gender && "border-red-500 outline-red-500"}`}
                >
                    <option value="">--Select Gender--</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                {errors.gender && <p className="text-sm text-red-600 mt-1">{errors.gender.message}</p>}
            </div>

            {/* Bio */}
            <div>
                <label className="block text-sm font-semibold text-gray-700">Bio</label>
                <textarea
                    {...register('bio')}
                    rows={4}
                    className="mt-1 block text-gray-600 w-full resize-none border-gray-300 rounded-md shadow-sm p-1 outline-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>

            {/* Submit Button */}
            <div className="text-right mt-5">
                <button
                    disabled={isSubmitting}
                    type="submit"
                    className={`px-4 py-2 text-white rounded-md  ${isSubmitting ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
                >
                    {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </form>
    )
}

export default UpdateInfo;