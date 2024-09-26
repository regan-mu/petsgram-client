import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { SingleUser } from "../utils/APIRequests";
import UserInfo from "../components/cards/userInfo";
import { User } from "../types";
import UserPosts from "../components/cards/userPosts";

const Profile = () => {
    const {id} = useParams();
    const {data: userData} = useQuery<User>(
        {
            queryKey: ["userProfile"],
            queryFn: () => SingleUser(id)
        }
    );
    return (
        <div className="px-10 py-7 flex flex-col w-full">
            <UserInfo userProfile={userData} />
            <UserPosts posts={userData?.posts} />
        </div>
    )
}

export default Profile;