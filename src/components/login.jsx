import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext"
import "./styles/loginstyles.css"
import { useFormik } from "formik";
import Lottie from "lottie-react";
import influencer__svg from "../assets/insta__svg.json";
import * as Yup from "yup";


export const Login = () => {
    const { guestLogin, loginAuth, signUp } = useAuthContext();
    const [loginFormMode, setLoginFormMode] = useState(true)
    const [showPass, setShowPass] = useState(false);

    const loginInitialValues = {
        username: "",
        password: "",
    }
    const signUpInitialValues = {
        username: "",
        firstName: "",
        lastName: "",
        password: "",
        confirm_password: "",
    }

    const loginSchema = Yup.object({
        username: Yup
            .string()
            .min(5, "User ID must be atleast 5 Characters")
            .required("User ID is required"),
        password: Yup
            .string()
            .required("Please enter password")

    });
    const signUpSchema = Yup.object({
        username: Yup
            .string()
            .min(6, "User ID must be atleast 6 Characters")
            .max(10, "max character length 10")
            .required("User ID is required")
            .matches("^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$", "Please use Alphanumeric and Special Characters(. and _ only) for username"),
        password: Yup
            .string()
            .required("Please enter password")
            .min(3, "Password must be atleast 3 characters"),
        firstName: Yup.string().required("Please enter first name"),
        lastName: Yup.string().required("Please enter last name"),
        confirm_password: Yup.string().oneOf([Yup.ref("password")], "Passwords do not match"),


    })
    const signuphandler = (values) => {
        const res = signUp(values);
        if (res) {
            setLoginFormMode(true);
            formik.resetForm();
        }
    }


    const formik = useFormik({
        initialValues: loginFormMode ? loginInitialValues : signUpInitialValues,
        validationSchema: !loginFormMode ? signUpSchema : loginSchema,
        onSubmit: (values) => {
            loginFormMode ? loginAuth(values) : signuphandler(values)
        }
    })


    useEffect(() => {
        formik.resetForm();
        // eslint-disable-next-line
    }, [loginFormMode])

    return <div className="loginPage min-h-[100vh] bg-white w-full p-5 flex items-center justify-center relative overflow-hidden z-1">
        <div className="box absolute h-[81.25rem] w-[81.25rem] z-2 bg-[#FFB8B82E] rotate-[40deg] right-[-40%] rounded-[1.855rem] top-[-70%]  max-2xl:right-[-30%] 2xl:w-[140rem] 2xl:h-[140rem] "></div>
        <div className="loginBox l shadow-[0_10px_20px_-10px_rgba(0,0,0,0.25)] flex flex-col lg:flex-row-reverse z-3 relative bg-white radius-sm items-center ">
            <div className="svg__side">
                <Lottie animationData={influencer__svg} loop={true} />
            </div>
            <div className="form__side  w-[23.125rem] p-[2.6rem]">
                <div className="login__header">
                    <h1 className="text-[2.5rem]">CommunityNet</h1>
                    <p className="text-[0.875rem]">Building Bridges, Fostering Community</p>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className={`loginForm ${loginFormMode ? `mt-[2.75rem]` : `mt-[1rem]`} flex flex-col gap-[0.81rem] w-full`}>
                        <div className="formControl flex flex-col justify-center items-start gap-[0.81rem] ">
                            <div className="label text-sm">User ID</div>
                            <input autoComplete="username" placeholder="john_doe@123" onChange={formik.handleChange} type="text" onBlur={formik.handleBlur} value={formik.values.username} name="username" id="username" className="w-full caret-pink-500 h-[2.1875rem] disabled:bg-[#0000003d] border-black border-2 text-[#A0616A] text-[0.75rem] font-[700] px-[0.69rem] py-[0.63rem]" />
                            {formik.errors.username && formik.touched.username ? <p className="text-red-700 text-xs font-bold">{formik.errors.username}</p> : null}
                        </div>
                        {!loginFormMode && <div className="formControl  flex justify-center items-start gap-[0.81rem] ">
                            <div className="names text-sm">
                                <div className="label">First Name</div>
                                <input placeholder="John" autoComplete="first-name" onChange={formik.handleChange} type="text" onBlur={formik.handleBlur} value={formik.values.firstName} name="firstName" id="firstName" className="w-full caret-pink-500 h-[2.1875rem] disabled:bg-[#0000003d] border-black border-2 text-[#A0616A] text-[0.75rem] font-[700] px-[0.69rem] py-[0.63rem]" />
                                {formik.errors.firstName && formik.touched.firstName ? <p className="text-red-700 text-xs font-bold">{formik.errors.firstName}</p> : null}
                            </div>
                            <div className="names">
                                <div className="label text-sm">Last Name</div>
                                <input placeholder="Doe" autoComplete="last-name" onChange={formik.handleChange} type="text" onBlur={formik.handleBlur} value={formik.values.lastName} name="lastName" id="lastName" className="w-full caret-pink-500 h-[2.1875rem] disabled:bg-[#0000003d] border-black border-2 text-[#A0616A] text-[0.75rem] font-[700] px-[0.69rem] py-[0.63rem]" />
                                {formik.errors.lastName && formik.touched.lastName ? <p className="text-red-700 text-xs font-bold">{formik.errors.lastName}</p> : null}
                            </div>
                        </div>}
                        <div className="formControl flex flex-col justify-center items-start gap-[0.4rem] w-full  ">
                            <div className="label text-sm">Password</div>
                            <div className="password__row flex items-center  border-black border-2 w-full gap-2">
                                <input
                                    placeholder="******"
                                    autoComplete="current-password"
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                    onBlur={formik.handleBlur}
                                    type={`${!showPass ? "password" : "text"}`}
                                    name="password"
                                    id="password"
                                    className=" caret-pink-500 h-[2.1875rem] w-[15rem] border-transparent disabled:bg-#0000003d text-[#A0616A] text-[0.75rem] font-[700] px-[0.69rem] py-[0.63rem]" />
                                <p onClick={() => setShowPass(!showPass)} className="passShow">
                                    {showPass ?
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg> :
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    }
                                </p>
                            </div>
                            {formik.errors.password && formik.touched.password ? <p className="text-red-700 text-xs font-bold">{formik.errors.password}</p> : null}
                            {loginFormMode && <p className="text-[#6C63FF] text-[0.75rem]"> ForgotPassword?</p>}
                        </div>
                        {!loginFormMode && <div className="formControl flex flex-col justify-center items-start gap-[0.81rem] w-full ">
                            <div className="label text-sm">Confirm Password</div>
                            <input autoComplete="none" placeholder="******" onChange={formik.handleChange} value={formik.values.confirm_password} onBlur={formik.handleBlur} type="password" name="confirm_password" id="confirm_password" className="w-full h-[2.1875rem]  caret-pink-500 disabled:bg-#0000003d border-black border-2 text-[#A0616A] text-[0.75rem] font-[700] px-[0.69rem] py-[0.63rem]" />


                            {formik.errors.confirm_password && formik.touched.confirm_password ? <p className="text-red-700 text-xs font-bold">{formik.errors.confirm_password}</p> : null}
                        </div>}
                    </div>

                    <div className="login__footer mt-[1.5rem] w-full">
                        {loginFormMode && <p className="text-left text-[0.75rem]">Dont Have an Account? <button onClick={() => setLoginFormMode(false)} className="text-[#6C63FF] hover:font-bold cursor-pointer hover:underline">SignUp</button></p>}
                        {!loginFormMode && <p className="text-left text-[0.75rem]">Back to <button onClick={() => setLoginFormMode(true)} className="text-[#6C63FF] cursor-pointer hover:font-bold hover:underline ">LogIn?</button></p>}
                        <div className="action__buttons flex flex-col w-full gap-[0.8rem] mt-[0.56rem]">
                            <button type="submit" className="bg-[#FFB8B8] transition-transform text-white font-bold   hover:scale-105 shadow-[0px_10px_12px_-6px_#6c63FF] h-[1.875rem]">{loginFormMode ? "Resume the Buzz" : "Join The Buzz"}</button>
                            <button onClick={() => {
                                guestLogin()
                            }} className="bg-[#FFB8B8] transition-transform text-white font-bold  hover:scale-105 shadow-[0px_10px_12px_-6px_#6c63FF] h-[1.875rem]">Guest Mode</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
}
