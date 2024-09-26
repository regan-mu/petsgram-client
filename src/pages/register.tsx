import { Helmet } from "react-helmet-async";
import RegisterForm from "../components/forms/registerForm";
const Register = () => {
    return (
        <div className="font-manrope w-full h-full flex flex-col gap-3 justify-center items-center p-10">
            <Helmet>
                <title>Petsgram - Sign up</title>
                <meta name="description" content="A fun Instagram-like app for sharing photos and moments with your pets" />
                <meta name="keywords" content="social media, photos, Petsgram, fun" />
                <meta property="og:title" content="Petsgram" />
                <meta property="og:description" content="A fun Instagram-like app for sharing photos and moments with your pets" />
            </Helmet>
            <div className="w-full border rounded-sm flex flex-col gap-5 md:w-96 p-5">
                <h1 className="font-extrabold text-4xl text-center font-sofadi">Petsgram</h1>
                <p className="text-gray-500 text-center font-light text-sm">Sign up to see photos and videos from your pet friends.</p>
                <RegisterForm />
            </div>
            <div className="w-full border font-semibold text-sm rounded-sm flex justify-center items-center gap-2 md:w-96 p-5">
                <span>Have an account? </span>
                <a className="text-blue-500" href="/login">Log in</a>
            </div>
        </div>
    )
}

export default Register;