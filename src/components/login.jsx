import { useState } from "react";
import { useAuthContext } from "../context/AuthContext"
import "./styles/loginstyles.css"
import { useFormik } from "formik";
import Lottie from "lottie-react";
import influencer__svg from "../assets/insta__svg.json";
import * as Yup from "yup";


export const Login = () => {
    const { guestLogin, loginAuth, signUp } = useAuthContext();
    const [loginFormMode, setLoginFormMode] = useState(true)

    const loginInitialValues = {
        username: "",
        password: "",
    }
    const signUpInitialValues = {
        username: "",
        firstName: "",
        lastname: "",
        password: "",
        confirm_password: "",
    }

    const loginSchema = Yup.object({
        username: Yup
            .string()
            .min(6, "User ID must be atleast 5 Characters")
            .required("User ID is required"),
        password: Yup
            .string()
            .required("Please enter password")

    });
    const signUpSchema = Yup.object({
        username: Yup
            .string()
            .min(6, "User ID must be atleast 6 Characters")
            .max(20, "max character length 20")
            .required("User ID is required")
            .matches("^(?=[a-zA-Z0-9._@]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$", "Please write Alphanumeric UserId only _ & @ is allowed"),
        password: Yup
            .string()
            .required("Please enter password")
            .min(3, "Password must be atleast 3 characters"),
        firstName: Yup.string().required("Please enter first name"),
        lastname: Yup.string().required("Please enter last name"),
        confirm_password: Yup.string().oneOf([Yup.ref("password")], "Passwords do not match"),


    })

    const formik = useFormik({
        initialValues: loginFormMode ? loginInitialValues : signUpInitialValues,
        validationSchema: !loginFormMode ? signUpSchema : loginSchema,
        onSubmit: (values) => {
            loginFormMode ? loginAuth(values) : signuphandler(values)
        }
    })

    const signuphandler = (values) => {
        const res = signUp(values);
        if (res) {
            setLoginFormMode(true);
            formik.resetForm();
        }
    }

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
                            <input autoComplete="username" placeholder="jon_doe@123" onChange={formik.handleChange} type="text" onBlur={formik.handleBlur} value={formik.values.username} name="username" id="username" className="w-full caret-pink-500 h-[2.1875rem] disabled:bg-[#0000003d] border-black border-2 text-[#A0616A] text-[0.75rem] font-[700] px-[0.69rem] py-[0.63rem]" />
                            {formik.errors.username && formik.touched.username ? <p className="text-red-700 text-xs font-bold">{formik.errors.username}</p> : null}
                        </div>
                        {!loginFormMode && <div className="formControl  flex justify-center items-start gap-[0.81rem] ">
                            <div className="names text-sm">
                                <div className="label">First Name</div>
                                <input autoComplete="first-name" onChange={formik.handleChange} type="text" onBlur={formik.handleBlur} value={formik.values.firstName} name="firstName" id="firstName" className="w-full caret-pink-500 h-[2.1875rem] disabled:bg-[#0000003d] border-black border-2 text-[#A0616A] text-[0.75rem] font-[700] px-[0.69rem] py-[0.63rem]" />
                                {formik.errors.firstName && formik.touched.firstName ? <p className="text-red-700 text-xs font-bold">{formik.errors.firstName}</p> : null}
                            </div>
                            <div className="names">
                                <div className="label text-sm">Last Name</div>
                                <input autoComplete="last-name" onChange={formik.handleChange} type="text onBlur={formik.handleBlur}" value={formik.values.lastname} name="lastname" id="lastname" className="w-full caret-pink-500 h-[2.1875rem] disabled:bg-[#0000003d] border-black border-2 text-[#A0616A] text-[0.75rem] font-[700] px-[0.69rem] py-[0.63rem]" />
                                {formik.errors.lastname && formik.touched.lastname ? <p className="text-red-700 text-xs font-bold">{formik.errors.lastname}</p> : null}
                            </div>
                        </div>}
                        <div className="formControl flex flex-col justify-center items-start gap-[0.4rem] w-full ">
                            <div className="label text-sm">Password</div>
                            <input autoComplete={loginFormMode ? "current-password" : "new-password"} onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} type="password" name="password" id="password" className="w-full caret-pink-500 h-[2.1875rem] disabled:bg-#0000003d border-black border-2 text-[#A0616A] text-[0.75rem] font-[700] px-[0.69rem] py-[0.63rem]" />
                            {formik.errors.password && formik.touched.password ? <p className="text-red-700 text-xs font-bold">{formik.errors.password}</p> : null}
                            {loginFormMode && <p className="text-[#6C63FF] text-[0.75rem]"> ForgotPassword?</p>}

                        </div>
                        {!loginFormMode && <div className="formControl flex flex-col justify-center items-start gap-[0.81rem] w-full ">
                            <div className="label text-sm">Confirm Password</div>
                            <input onChange={formik.handleChange} value={formik.values.confirm_password} onBlur={formik.handleBlur} type="password" name="confirm_password" id="confirm_password" className="w-full h-[2.1875rem]  caret-pink-500 disabled:bg-#0000003d border-black border-2 text-[#A0616A] text-[0.75rem] font-[700] px-[0.69rem] py-[0.63rem]" />
                            {formik.errors.confirm_password && formik.touched.confirm_password ? <p className="text-red-700 text-xs font-bold">{formik.errors.confirm_password}</p> : null}
                        </div>}
                    </div>

                    <div className="login__footer mt-[1.5rem] w-full">
                        {loginFormMode && <p className="text-left text-[0.75rem]">Dont Have an Account? <button onClick={() => setLoginFormMode(false)} className="text-[#6C63FF] cursor-pointer ">SignUp</button></p>}
                        {!loginFormMode && <p className="text-left text-[0.75rem]">Back to <button onClick={() => setLoginFormMode(true)} className="text-[#6C63FF] cursor-pointer ">LogIn?</button></p>}
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