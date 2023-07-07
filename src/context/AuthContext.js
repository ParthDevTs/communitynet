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
    const [profileData, setProfileData] = useState({});
    const authToken = localStorage.getItem("encodedToken");
    const [currentUserProfileId, setCurrentUserProfileId] = useState("")
    const [openEditProfile, setOpenEditProfile] = useState(false);


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
                    console.log(data)
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
        console.log(logincred)
        setShowLoading(true)
        let id = toast("Logging In");




        await fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify(logincred),
        }).then(async (res) => await res.json())
            .then(async (data) => {
                console.log(data)
                if (data.encodedToken) {
                    setUserData(data?.foundUser)
                    setUserName(data?.foundUser.username)
                    setCurrentUserProfileId(data?.foundUser._id)
                    localStorage.setItem("encodedToken", data.encodedToken);
                    localStorage.setItem("loginEmail", data.foundUser.email);
                    setIsLoggedIn(true);
                    navigate(location?.state?.from?.pathname);
                    toast.done(id);
                    toast.update(id,
                        {
                            type: toast.TYPE.SUCCESS,
                            autoClose: 2200,
                            render:
                                <p>Welcome user
                                    <span className="font-bold text-violet-500">@{data.foundUser.username}</span>
                                </p>
                        });

                    setShowLoading(false)
                    return true;
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



    const getProfileDataFromParams = async (userID) => {
        if (!userID) {
            userID = userData._id
        }

        const header = {
            authorization: localStorage.getItem("encodedToken")
        }
        await fetch(`/api/users/${userID}`, {
            headers: header,
            method: "GET"
        })
            .then((res) => res.json())
            .then(data => {
                if (data.error) {
                    toast.error("Some error occured")

                } else {
                    setProfileData(data.user)

                }
            })
            .catch(error => console.error(error))
    }

    const editProfile = async (editedData) => {
        setShowLoading(true)
        const header = {
            authorization: localStorage.getItem("encodedToken")
        }
        await fetch("/api/users/edit", {
            method: "POST",
            body: JSON.stringify({ userData: { ...userData, ...editedData } }),
            headers: header
        })
            .then(async (res) => res.json())
            .then(async (data) => {

                if (data.user) {
                    setProfileData(data.user)
                    setShowLoading(false)
                    return true
                } else {
                    toast.error(" Some error Occured while updating Profile");
                    setShowLoading(false)
                    return false
                }

            })
            .catch((e) => {
                toast.error("Some error Occured while updating Profile");
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
        <AuthContext.Provider value={{ editProfile, openEditProfile, setOpenEditProfile, setShowLoading, currentUserProfileId, setCurrentUserProfileId, profileData, setProfileData, getProfileDataFromParams, setUserData, showLoading, userData, userName, isLoggedIn, setIsLoggedIn, guestLogin, logOut, loginAuth, signUp, authToken }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);