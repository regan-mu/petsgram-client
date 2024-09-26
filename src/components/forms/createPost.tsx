import {  useState } from "react";
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AiOutlineClose   } from "react-icons/ai";
import { ICreatePost } from "../../types";
import { newPost } from "../../utils/APIRequests";

const CreatePost: React.FC<{createPost: () => void}> = ({createPost}) => {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setError } = useForm<ICreatePost>();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const queryClient = useQueryClient();

    // Data Mutation
    const {mutateAsync: newPostMutation, isSuccess} = useMutation({
        mutationFn: newPost, onSuccess: () => {
            setTimeout(() => {
                reset();
                createPost();
                queryClient.invalidateQueries({queryKey: ["userProfile"]});
            }, 1000);
        }, onError: (error) => {
            setError("root", error);
        }
    }
    );
     // Handle image preview
    const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target?.files?.[0];
        if (file) {
        setImagePreview(URL.createObjectURL(file));
        }
    };

    // Submit form
    const onSubmit: SubmitHandler<ICreatePost> = async (data) => {
        const formData = new FormData();
        formData.append('message', data.message);
        formData.append('image', data.image[0]);
        await newPostMutation(formData);
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center p-10 fixed left-0 top-0 bg-black bg-opacity-80 z-20">
            <div className={`bg-white flex flex-col rounded-lg min-h-96 max-h-full shadow-lg max-w-2xl mx-auto relative ${page === 2 ? "w-2/3": "w-96"}`}>
                <div className="absolute -top-5 -right-20 cursor-pointer" onClick={() => createPost()}>
                    <AiOutlineClose size={22} color={"white"} />
                </div>
                <h2 className="text-lg text-center font-semibold mb-4 border-b px-6 pt-6 pb-4 h-max">Create a Post</h2>
                <div className="px-6">
                    {errors.root && <p className="text-red-700 bg-red-300 mb-4 text-center rounded-sm py-1 text-sm font-semibold">{errors.root.message}</p>}
                    {isSuccess && <p className="text-green-800 bg-green-100 mb-4 text-center rounded-md py-2 text-sm font-semibold">Successful</p>}
                </div>
                <form className="w-full h-full flex flex-col justify-center p-6 pt-0" onSubmit={handleSubmit(onSubmit)}>
                    <div className={`h-full flex gap-3 ${page == 2 ? "flex-row-reverse" : "flex-col justify-center"}`}>
                        {page === 1 ? 
                        <div>
                            {/* Image input */}
                            <input
                                type="file"
                                placeholder="Upload Image"
                                accept="image/*"
                                {...register('image', { required: true })}
                                onChange={handleImagePreview}
                                className="block w-full rounded-sm text-sm border text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            {errors.image && <p className="text-red-500">Image is required</p>}
                        </div> :
                        <div className="mb-4 w-full">
                            {/* Message input */}
                            <textarea
                                {...register('message', { required: true })}
                                placeholder="What's on your mind?"
                                rows={4}
                                className="w-full p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                            ></textarea>
                            {errors.message && <p className="text-red-500">Message is required</p>}
                        </div>}

                        {/* Image Preview */}
                        {imagePreview && (
                        <div className="mb-4 w-full h-64 overflow-hidden rounded-md">
                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                        )}
                    </div>

                    {/* Submit button */}
                    {
                        page == 1 && imagePreview && <button onClick={() => {setPage(2)}} type="button" className="text-blue-500 font-semibold cursor-pointer">Next</button>
                    }
                    {page === 2 &&  <div className="w-full flex gap-5">
                        <button onClick={() => {setPage(1)}} type="button" className="text-gray-500 w-full border rounded-md font-semibold cursor-pointer">Back</button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md transition-all ${
                                isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
                            }`}
                        >
                            {isSubmitting ? 'Posting...' : 'Post'}
                        </button>
                    </div>
                    }
                </form>
            </div>
        </div>
    )
}

export default CreatePost;