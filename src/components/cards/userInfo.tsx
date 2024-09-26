import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "../../types";
import { CLOUDINARY_IMG_PREFIX } from "../../constants";
import { Follow, Unfollow } from "../../utils/APIRequests";
import FollowingBtn from "./followingBtn";

const UserInfo: React.FC<{userProfile: User | undefined}> = ({userProfile}) => {
    const [isExpanded, setExpanded] = useState<boolean>(false);
    const [isFollowed, setIsFollowed] = useState<boolean>(false)
    const userID = Number(localStorage.getItem("user"));
    const client = useQueryClient();

    const {mutateAsync: followUser} = useMutation(
        {
            mutationFn: () => Follow(userProfile?.id),
            mutationKey: ["followUser"],
            onSuccess: () => {
                client.invalidateQueries({queryKey: ["userProfile"]});
            }
        }
    );

    const {mutateAsync: unfollowUser} = useMutation(
        {
            mutationFn: () => Unfollow(userProfile?.id),
            mutationKey: ["unfollowUser"],
            onSuccess: () => {
                client.invalidateQueries({queryKey: ["userProfile"]});
            }
        }
    );

    const handleFollow = async () => {
        await followUser();
        setIsFollowed(true);
    }

    const handleUnfollow = async () => {
        await unfollowUser();
        setIsFollowed(false);
    }

    return (
        <div className="p-10 border-b flex gap-20  items-center h-auto w-full">
            <div>
                <div className="w-48 h-48 overflow-hidden rounded-full">
                    <img className="w-full h-full object-cover" src={`${CLOUDINARY_IMG_PREFIX}${userProfile?.avatar}`} alt="" />
                </div>
            </div>
            <div className="flex flex-col gap-5 w-full">
                <div className="flex w-full h-auto items-center gap-5" >
                    <h3 className="text-xl">{userProfile?.username}</h3>
                    {userID === userProfile?.id ? <a href={`/edit/${userProfile?.id}`} className="bg-gray-300 py-1 px-4 rounded-md">Edit profile</a> :  userProfile?.followers?.some(user => user?.following?.id === userID) || isFollowed ? <FollowingBtn unfollow={handleUnfollow} /> : <button onClick={handleFollow} className="bg-blue-500 py-1 px-4 text-white rounded-md">Follow</button>}
                </div>
                <div className="flex w-full h-auto gap-10 items-center">
                    <div>
                        <span className="font-medium">{userProfile?.posts?.length}</span>
                        <span> posts</span>
                    </div>
                    <div>
                        <span className="font-medium">{userProfile?.followers?.length}</span>
                        <span> followers</span>
                    </div>
                    <div>
                        <span className="font-medium">{userProfile?.followings?.length}</span>
                        <span> following</span>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="bg-gray-200 cursor-pointer text-sm w-max px-4 rounded-2xl py-1">@{userProfile?.username}</p>
                    <div>
                        <span className={`transition-all duration-300 ${isExpanded ? "" : "line-clamp-2"}`}>{userProfile?.bio}</span>
                        {
                            userProfile?.bio && userProfile?.bio?.length > 100 && <button onClick={() => setExpanded(!isExpanded)} className="text-gray-400 w-max">
                                {isExpanded ? 'Less' : 'More'}
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserInfo;