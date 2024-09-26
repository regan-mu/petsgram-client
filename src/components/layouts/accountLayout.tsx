import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import CreatePost from "../forms/createPost";
import Search from "../cards/search";

const AccountLayout: React.FC = () => {
    const [addPost, setAddPost] = useState<boolean>(false);
    const [search, setSearch] = useState<boolean>(false);
    const createPostToggle = () => {
        setAddPost(prev => !prev);
    }
    const perfomSearch = () => {
        setSearch(prev => !prev);
    }
    return (
        <div className="flex w-full relative">
            {addPost && <CreatePost createPost = {createPostToggle} />}
            {search && <Search closeSearch={perfomSearch} />}
            <Sidebar search={perfomSearch} createPost = {createPostToggle} />
            <Outlet />
        </div>
    )
}

export default AccountLayout;