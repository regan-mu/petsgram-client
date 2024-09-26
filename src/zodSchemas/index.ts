import z from "zod";

export const registerFormSchema = z.object({
    username: z.string().min(2, { message: "Username Must be 2 or more characters long"}).toLowerCase(),
    email: z.string().email(),
    gender: z.string().min(1, { message: "Gender not selected"}),
    password: z.string().min(8)
});

export const loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, {"message": "Invalid password"})
});

export const profileUpdateFormSchema = z.object({
    username: z.string().min(2, { message: "Username Must be 2 or more characters long"}).toLowerCase(),
    bio: z.string(),
    email: z.string().email(),
    gender: z.string().min(1, { message: "Gender not selected"}),
});
