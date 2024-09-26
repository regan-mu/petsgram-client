import { AiOutlineHome, AiFillHome, AiOutlineLogout, AiOutlineSearch, AiOutlineUser, AiOutlineHeart, AiOutlinePlusSquare   } from "react-icons/ai";

const Sidebar: React.FC<{createPost: () => void, search: () => void}> = ({createPost, search}) => {
    const userID = localStorage.getItem("user");
    return (
        <div className="hidden md:border-r lg:flex flex-col space-y-8 w-80 p-4 sticky top-0 h-screen">
            <a href="/" className="text-4xl font-light my-6 px-2 font-poppins">Petsgram</a>
            <div className="space-y-4 text-xl">
                <a href="/" className="flex items-center space-x-4 cursor-pointer p-2 rounded-md hover:bg-gray-200 group">
                    <AiOutlineHome className="group-hover:scale-95 duration-100 delay-75" size={32} />
                    <span>Home</span>
                </a>
                <div className="flex items-center space-x-4 cursor-pointer p-2 rounded-md hover:bg-gray-200 group" onClick={search}>
                    < AiOutlineSearch className="group-hover:scale-95 duration-100 delay-75" size={32} />
                    <span>Search</span>
                </div>
                <a href="/notifications" className="flex items-center space-x-4 cursor-pointer p-2 rounded-md hover:bg-gray-200 group">
                    < AiOutlineHeart className="group-hover:scale-95 duration-100 delay-75" size={32} />
                    <span>Notifications</span>
                </a>
                <div onClick={() => createPost()} className="flex items-center space-x-4 cursor-pointer p-2 rounded-md hover:bg-gray-200 group">
                    < AiOutlinePlusSquare className="group-hover:scale-95 duration-100 delay-75" size={32}  />
                    <span>Create</span>
                </div>
                <a href={`/profile/${userID}`} className="flex items-center space-x-4 cursor-pointer p-2 rounded-md hover:bg-gray-200 group">
                    < AiOutlineUser className="group-hover:scale-95 duration-100 delay-75" size={32} />
                    <span>Profile</span>
                </a>
                <a href="/logout" className="flex items-center space-x-4 cursor-pointer p-2 rounded-md hover:bg-gray-200 group">
                    < AiOutlineLogout className="group-hover:scale-95 duration-100 delay-75" size={32}  />
                    <span>Logout</span>
                </a>
            </div>
        </div>
    )
}

export default Sidebar;