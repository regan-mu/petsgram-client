import { CLOUDINARY_IMG_PREFIX } from "../../constants";
import { SingleUser, UpdateAvatar } from "../../utils/APIRequests";
import { User } from "../../types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const EditAvatar: React.FC = () => {
    const params = useParams();
    const queryClient = useQueryClient();
    const {id} = params;
    const {data} = useQuery<User>({
        queryKey: ["retrieve_user_avatar"],
        queryFn: () => SingleUser(id)
    });

    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const formData = new FormData();
        const file = e.target?.files?.[0];
        if (file) {
            formData.append("avatar", file);
            await UpdateAvatar(formData);
            queryClient.invalidateQueries({queryKey: ["retrieve_user_avatar"]});
        }
    }

    return (
        <div className="flex justify-between items-center bg-gray-100 w-full p-10 rounded-2xl">
                <div className="flex h-full items-center">
                    <img src={`${CLOUDINARY_IMG_PREFIX}${data?.avatar}`} alt="" className="w-12 h-12 rounded-full mr-3 object-cover" />
                    <span>{data?.username}</span>
                </div>
                <input
                    type="file"
                    accept="image/*" 
                    onChange={handleAvatarChange}
                />
        </div>
    )
}

export default EditAvatar;