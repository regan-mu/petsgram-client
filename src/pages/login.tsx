import { Helmet } from "react-helmet-async";
import LoginForm from "../components/forms/loginForm";
const Login = () => {
    return (
        <div className="font-manrope w-full h-screen flex flex-col gap-3 justify-center items-center p-10">
            <Helmet>
                <title>Petsgram - Login</title>
                <meta name="description" content="A fun Instagram-like app for sharing photos and moments with your pets" />
                <meta name="keywords" content="social media, photos, Petsgram, fun" />
                <meta property="og:title" content="Petsgram" />
                <meta property="og:description" content="A fun Instagram-like app for sharing photos and moments with your pets" />
            </Helmet>
            <div className="w-full border rounded-sm flex flex-col gap-5 md:w-96 p-5">
                <h1 className="font-extrabold text-4xl text-center font-sofadi">Petsgram</h1>
                <LoginForm />
            </div>
            <div>
                <a className="text-darkText text-sm font-semibold" href="#">Forgot password</a>
            </div>
            <div className="w-full border font-semibold text-sm rounded-sm flex justify-center items-center gap-2 md:w-96 p-5">
                <span>Don't have an account? </span>
                <a className="text-blue-500" href="/register">Sign up</a>
            </div>
        </div>
    )
}

export default Login;