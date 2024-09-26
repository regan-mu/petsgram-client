import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import API from "../../utils/axiosConfig";
import { AxiosResponse, isAxiosError } from "axios";

const AddComment: React.FC<{postID: number | undefined}> = ({postID}) => {
    const [message, setMessage] = useState<{comment: string}>({comment: ""});
    const queryClient = useQueryClient();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        setMessage({comment: value})
    }

    // Prevent submit on clicking enter
    const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
        if (event.key === 'Enter' && message.comment.length === 0) {
          event.preventDefault();
        }
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res: AxiosResponse = await API.post(`/post/${postID}/comments`, {message: message.comment});
            setMessage({comment: ""});
            queryClient.invalidateQueries({queryKey: ["retrievePost"]});
            queryClient.invalidateQueries({queryKey: ["feed"]});

        } catch(error) {
            if(isAxiosError(error)) {
                alert(error?.response?.data?.detail);
            }
        }
    }
    return (
        <form onSubmit={onSubmit} onKeyDown={handleKeyDown} className="pr-4 bg-gray-100 rounded-md overflow-hidden flex">
            <input onChange={handleChange} name="message" type="text" placeholder="Add a comment..." value={message.comment} className="w-full p-2 focus:outline-none bg-inherit" />
            {message.comment.length > 0 && <button className="w-max text-blue-500 font-semibold">Post</button>}
        </form>
    )
}

export default AddComment;