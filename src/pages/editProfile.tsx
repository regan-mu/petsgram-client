import EditAvatar from "../components/cards/editAvatar";
import UpdateInfo from "../components/forms/updateUserInfo";

const EditProfile: React.FC = () => {

    return (
        <div className="p-10 flex flex-col gap-10 w-full h-auto">
            <h3 className="font-bold text-2xl">Edit Profile</h3>
            <EditAvatar />
            <div className="flex justify-center bg-gray-100 w-full p-10 rounded-2xl">
                <UpdateInfo />
            </div>

        </div>
    )
}

export default EditProfile;