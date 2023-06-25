import { createContext, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const AuthContext = createContext({ isLoggedIn: false });



export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    // const { resetCounters, loginDataLoad } = useCart();

    const guestLogin = async () => {
        let id = toast.loading("Logging In");
        const creds = {
            username: "adarshbalika",
            password: "adarshBalika123",
        };

        await fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify(creds),
        })
            .then(async (res) => await res.json())
            .then(async (data) => {
                localStorage.setItem("encodedToken", data.encodedToken);
                localStorage.setItem("loginEmail", creds.email);
                setIsLoggedIn(true);
                navigate(location?.state?.from?.pathname);
                // loginDataLoad();
                toast.done(id);
                toast.success(`Welcome user ${creds.username}`);
                setUserName(creds.username)

            })
            .catch((e) => {
                toast.done(id);
                toast.error("Some error Occured");
            });
    }

    const loginAuth = async (logincred) => {
        let id = toast.loading("Logging In");

        await fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify(logincred),
        })
            .then(async (res) => await res.json())
            .then(async (data) => {
                localStorage.setItem("encodedToken", data.encodedToken);
                localStorage.setItem("loginEmail", logincred.email);
                setIsLoggedIn(true);
                navigate(location?.state?.from?.pathname);
                // loginDataLoad();
                toast.done(id);
                toast.success(`Welcome user ${logincred.username}`);
                setUserName(logincred.username)
            })
            .catch((e) => {
                toast.done(id);
                toast.error("Some error Occured");
            });
    }
    const signUp = async (signUpCreds) => {
        await fetch("/api/auth/signup", {
            method: "POST",
            body: JSON.stringify(signUpCreds),
        })
            .then(async (res) => await res.json())
            .then(async (data) => {
                localStorage.setItem("encodedToken", data.encodedToken);
                localStorage.setItem("loginEmail", signUpCreds.email);
                setIsLoggedIn(true);
                navigate(location?.state?.from?.pathname);
                // loginDataLoad();

                toast.success(`Welcome user ${signUpCreds.username}`);
                setUserName(signUpCreds.username)
            })
            .catch((e) => {

                toast.error("Some error Occured");
            });
    }

    const logOut = () => {
        // resetCounters();
        setIsLoggedIn(false);
        localStorage.removeItem("encodedToken");
        toast.info("Logged Out In Successfully");
    };

    return (
        <AuthContext.Provider value={{ userName, isLoggedIn, setIsLoggedIn, guestLogin, logOut, loginAuth, signUp }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);