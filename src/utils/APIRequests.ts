import { User, UpdateInputs } from "../types";
import API from "./axiosConfig";
import { AxiosResponse, isAxiosError } from "axios";

export const fetchFeed = async () => {
    try {
        const res: AxiosResponse = await API.get("/feed");
        return res?.data
    } catch(error) {
        if(isAxiosError(error)) {
            return error?.response?.data?.detail;
        } else {
            return "Something went wrong";
        }
    }
}

export const fetchPostComments = async (postID: number) => {
    try {
        const res: AxiosResponse = await API.get(`/post/${postID}/comments`);
        return res?.data
    } catch(error) {
        if(isAxiosError(error)) {
            return error?.response?.data?.detail;
        } else {
            return "Something went wrong";
        }
    }
}

export const likePost = async (postID: number) => {
    try {
        const res: AxiosResponse = await API.post(`/post/${postID}/like`);
        return res?.data
    } catch(error) {
        if(isAxiosError(error)) {
            return error?.response?.data?.detail;
        } else {
            return "Something went wrong";
        }
    }
}
export const unlikePost = async (postID: number) => {
    try {
        const res: AxiosResponse = await API.delete(`/post/${postID}/unlike`);
        return res?.data
    } catch(error) {
        if(isAxiosError(error)) {
            return error?.response?.data?.detail;
        } else {
            return "Something went wrong";
        }
    }
}

// Add new post
export const newPost = async (data: FormData) => {
    try {
        const res: AxiosResponse = await API.post("posts", data);
        return res?.data;
    } catch(error) {
        if(isAxiosError(error)) {
            return error?.response?.data?.detail;
        } else {
            return "Something went wrong";
        }
    }
}


// Search Users
export const SearchUser = async (queryParam: string) => {
    try {
        const res: AxiosResponse = await API.get(`users?username=${queryParam}`);
        return res?.data;
    } catch(error) {
        if(isAxiosError(error)) {
            return error?.response?.data?.detail;
        } else {
            return "Something went wrong";
        }
    }
}


// Fetch single user
export const SingleUser = async (userID: string | undefined) => {
    try {
        const res: AxiosResponse = await API.get(`user/${userID}`);
        return res?.data;
    } catch(error) {
        if(isAxiosError(error)) {
            return error?.response?.data?.detail;
        } else {
            return "Something went wrong";
        }
    }
}

// Retrieve Post
export const RetrievePost = async (postID: string | undefined) => {
    try {
        const res: AxiosResponse = await API.get(`post/${postID}`);
        return res?.data;
    } catch(error) {
        if(isAxiosError(error)) {
            return error?.response?.data?.detail;
        } else {
            return "Something went wrong";
        }
    }
}

// Follow someone
export const Follow = async (followID: number | undefined) => {
    try {
        const res: AxiosResponse = await API.post("follow", {follow_id: followID});
        return res?.data;
    } catch(error) {
        if(isAxiosError(error)) {
            return error?.response?.data?.detail;
        } else {
            return "Something went wrong";
        }
    }
}

// Unfollow someone
export const Unfollow = async (followID: number | undefined) => {
    try {
        const res: AxiosResponse = await API.delete(`unfollow/${followID}`);
        return res?.data;
    } catch(error) {
        if(isAxiosError(error)) {
            return error?.response?.data?.detail;
        } else {
            return "Something went wrong";
        }
    }
}


// Update Avatar
export const UpdateAvatar = async (data: FormData) => {
    const userID = localStorage.getItem("user");
    try {
        const res: AxiosResponse = await API.patch(`user/${userID}/avatar/update`, data);
        return res?.data;
    } catch(error) {
        if(isAxiosError(error)) {
            return error?.response?.data?.detail;
        } else {
            return "Something went wrong";
        }
    }
}

// Update Avatar
export const UpdateUserInfo = async (data: UpdateInputs) => {
    const userID = localStorage.getItem("user");
    try {
        const res: AxiosResponse = await API.patch(`user/${userID}/update`, data);
        return res?.data;
    } catch(error) {
        if(isAxiosError(error)) {
            return error?.response?.data?.detail;
        } else {
            return "Something went wrong";
        }
    }
}
