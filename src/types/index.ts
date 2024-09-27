import { ReactNode } from "react";
import z from "zod";
import { registerFormSchema, loginFormSchema, profileUpdateFormSchema } from "../zodSchemas";

export interface ComponentProp {
    children: ReactNode
}

export interface JwtPayload {
    sub: string;
    name: string;
    exp: number;
    user_id: string
}


export interface PostOwner {
    id: number,
    username: string,
    avatar: string
}

export interface Icomment {
    id: number,
    message: string,
    created: string,
    age: string,
    owner: PostOwner
}

export interface Ilike {
    id: number,
    owner: number
}

export interface Ipost {
    id: number,
    message: string,
    owner: PostOwner, 
    image: string,
    likes: Ilike[],
    age: string,
    comments: Icomment[]
}

export interface ICreatePost {
    message: string;
    image: FileList;
}

export interface Follows {
    id: number,
    following?: PostOwner
}

export interface User extends PostOwner {
    email: string,
    bio: string,
    gender: string,
    followings: []
    followers: Follows[],
    posts: Ipost[]
}

export interface Irequestreset {
    email: string
}
export interface Ipasswordreset {
    password: string,
    confirmPassword: string,
    uidb64: string | undefined,
    token: string | undefined
}



export type  RegisterInputs = z.infer<typeof registerFormSchema>;
export type LoginInputs = z.infer<typeof loginFormSchema>;
export type UpdateInputs = z.infer<typeof profileUpdateFormSchema>;