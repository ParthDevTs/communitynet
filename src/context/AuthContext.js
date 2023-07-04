import { createContext, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export const AuthContext = createContext({ isLoggedIn: false });



export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [userData, setUserData] = useState({});
    const [showLoading, setShowLoading] = useState(false)
    const authToken = localStorage.getItem("encodedToken");


    // const { resetCounters, loginDataLoad } = useCart();



    const guestLogin = async () => {
        setShowLoading(true)
        const toastId = toast("Logging In");

        const creds = {
            username: "parthk101",
            password: "parth",
        };

        await fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify(creds),
        })
            .then(async (res) => await res.json())
            .then(async (data) => {

                if (data.encodedToken) {

                    setUserData(data?.foundUser)
                    localStorage.setItem("encodedToken", data.encodedToken);
                    localStorage.setItem("loginEmail", creds.email);
                    setIsLoggedIn(true);
                    navigate(location?.state?.from?.pathname);
                    toast.done(toastId);
                    toast.update(toastId, { type: toast.TYPE.SUCCESS, autoClose: 2200, render: <p>Welcome user <span className="font-bold text-violet-500">@{creds.username}</span></p> });
                    setUserName(creds.username)
                    setShowLoading(false)

                    return true;
                } else {
                    toast.done(toastId)
                    toast.update(toastId, { type: toast.TYPE.ERROR, autoClose: 2200, render: `Username and Password dont match` });
                    setShowLoading(false)

                    return false;
                }
            })
            .catch((e) => {
                toast.update(toastId, { type: toast.TYPE.ERROR, autoClose: 2200, render: `Username and Password dont match, ${e}` });
                setShowLoading(false)
                return false
            });

    }

    const loginAuth = async (logincred) => {
        setShowLoading(true)
        let id = toast("Logging In");
        await fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify(logincred),
        }).then(async (res) => await res.json())
            .then(async (data) => {
                if (data.encodedToken) {
                    localStorage.setItem("encodedToken", data.encodedToken);
                    localStorage.setItem("loginEmail", logincred.email);
                    setIsLoggedIn(true);
                    navigate(location?.state?.from?.pathname);
                    toast.done(id);
                    toast.update(id, { type: toast.TYPE.SUCCESS, autoClose: 2200, render: <p>Welcome user <span className="font-bold text-violet-500">@{logincred.username}</span></p> });
                    setShowLoading(false)

                    setUserName(logincred.username)
                }
                else {
                    toast.done(id);
                    toast.update(id, { type: toast.TYPE.ERROR, autoClose: 2200, render: `Username and Password dont match` });
                    setShowLoading(false)

                    return false;

                }
            })
            .catch((error) => {
                toast.done(id);
                toast.update(id, { type: toast.TYPE.ERROR, autoClose: 2200, render: error[0] });
                setShowLoading(false);
                return (false)
            });
    }
    const signUp = async (signUpCreds) => {
        setShowLoading(true)
        await fetch("/api/auth/signup", {
            method: "POST",
            body: JSON.stringify(signUpCreds),
        })
            .then(async (res) => await res.json())
            .then(async (data) => {
                console.log(data)
                if (data.createdUser) {
                    localStorage.setItem("encodedToken", data.encodedToken);
                    setUserData(data.createdUser)
                    setIsLoggedIn(true);
                    navigate(location?.state?.from?.pathname);
                    setShowLoading(false)
                    setUserName(data.createdUser.username)
                    toast.success(`Successfully Signed Up ${signUpCreds.username}`);
                    return (true)
                } else {
                    toast.error("Some error Occured");
                    setShowLoading(false)
                    return false
                }

            })
            .catch((e) => {
                toast.error("Some error Occured");
                setShowLoading(false)
                return (false)
            });
    }

    const logOut = () => {
        // resetCounters();
        setShowLoading(true)
        setIsLoggedIn(false);
        localStorage.removeItem("encodedToken");
        toast.info("Logged Out In Successfully");
        setShowLoading(false)
    };

    return (
        <AuthContext.Provider value={{ setUserData, showLoading, userData, userName, isLoggedIn, setIsLoggedIn, guestLogin, logOut, loginAuth, signUp, authToken }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);