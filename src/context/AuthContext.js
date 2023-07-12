import { createContext, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import female_1 from "../assets/avatar_images/female-1.jpg"
import female_2 from "../assets/avatar_images/female-2.jpg"
import male_1 from "../assets/avatar_images/male-1.jpg"
import male_2 from "../assets/avatar_images/male-2.jpg"
import male_3 from "../assets/avatar_images/male-3.jpg"
import profile__blob from "../assets/profile__blob.svg"
import profile__poly from "../assets/profile__poly.svg"
import profile__wave from "../assets/profile__wave.svg"
import profile__layeredPeaks from "../assets/profile__layeredpeaks.svg"
import profile__layeredWaves from "../assets/profile__layeredwaves.svg"
import profile__wave2 from "../assets/profile__wave2.svg"




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



    const stockAvatarImageArray = [
        female_1, male_1, female_2, male_2, male_3
    ]

    const bg__options = [
        { name: "wave", url: profile__wave },
        { name: "blob", url: profile__blob },
        { name: "poly", url: profile__poly },
        { name: "wave2", url: profile__wave2 },
        { name: "layered waves", url: profile__layeredWaves },
        { name: "layered peaks", url: profile__layeredPeaks },
    ]



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
                    navigate("/")
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
                    setUserData(data?.foundUser)
                    setUserName(data?.foundUser.username)
                    setCurrentUserProfileId(data?.foundUser._id)
                    localStorage.setItem("encodedToken", data.encodedToken);
                    localStorage.setItem("loginEmail", data.foundUser.email);
                    setIsLoggedIn(true);
                    // navigate(location?.state?.from?.pathname);
                    navigate("/")
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
                    // navigate(location?.state?.from?.pathname);
                    setShowLoading(false)
                    setUserName(data.createdUser.username)
                    toast.success(`Successfully Signed Up ${signUpCreds.username}`);
                    navigate("/")
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
        const id = toast.loading("Editing Profile")
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
                    setUserData(data.user)
                    setShowLoading(false)
                    toast.update(id, {
                        render: `Update Successfull`,
                        type: "info",
                        isLoading: false,
                        autoClose: true,
                        closeOnClick: true,
                        closeButton: "Close"
                    });

                    return true
                } else {
                    toast.update(id, {
                        render: `Some Error Occurred`,
                        type: "Error",
                        isLoading: false,
                        autoClose: true,
                        closeOnClick: true,
                        closeButton: "Close"
                    });
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
        <AuthContext.Provider value={{
            editProfile,
            openEditProfile,
            setOpenEditProfile,
            setShowLoading,
            currentUserProfileId,
            setCurrentUserProfileId,
            profileData,
            setProfileData,
            getProfileDataFromParams,
            setUserData,
            showLoading,
            userData,
            userName,
            isLoggedIn,
            setIsLoggedIn,
            guestLogin,
            logOut,
            loginAuth,
            signUp,
            authToken,
            stockAvatarImageArray,
            bg__options,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);