import React, { useEffect } from 'react'
import Navbar from '../components/Navbar';
import LeftSIdeBar from '../components/LeftSIdeBar';
import Follow from '../components/follow';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { Post } from '../components/post';
import { usePostContext } from '../context/postContext';
import EditProfileDialog from '../components/editProfileDialog';
import no_data_found from "../assets/no_data_found.json";
import Lottie from "lottie-react";
import MobNavbar from '../components/mobNavBar';
function Profile() {

    const { userID } = useParams()



    const { getProfileDataFromParams,
        profileData,
        userData,
        setCurrentUserProfileId,
        openEditProfile,
        setOpenEditProfile,
    } = useAuthContext()


    const { followUser,
        followList,
        unFollow } = usePostContext()



    const findUserinFollowList = followList?.find((user) => user._id === profileData._id)

    const followHandler = () => {
        if (findUserinFollowList) {
            followUser(profileData?._id)
        } else {
            unFollow(profileData?._id)
        }
    }

    const { allPosts } = usePostContext()
    const getUserData = () => {
        getProfileDataFromParams(userID)
    }



    useEffect(getUserData
        // eslint-disable-next-line
        , [userID])

    useEffect(() => {
        document.title = `Community Net - ${profileData ? profileData?.username : "Profile"}`;
        // eslint-disable-next-line
    }, [profileData])

    useEffect(() => {
        if (userID) { setCurrentUserProfileId(userID) }

        // eslint-disable-next-line
    }, [userID])


    const { firstName, lastName, followers, following, imgUrl, bio, url, profile__bg } = profileData;

    const selectbg = () => {
        switch (profile__bg) {
            case "wave":
                return "bg-no-repeat bg-bottom  bg-profile-wave"
            case "blob":
                return "bg-no-repeat  bg-center bg-cover  bg-profile-blob"
            case "poly":
                return "bg-no-repeat bg-center bg-cover bg-profile-poly"
            case "wave2":
                return "bg-no-repeat bg-center bg-cover bg-profile-wave2"
            case "layered waves":
                return "bg-no-repeat bg-center bg-cover bg-profile-layeredwaves"
            case "layered peaks":
                return "bg-no-repeat bg-center bg-cover bg-profile-layeredpeaks"
            default:
                return "bg-no-repeat  bg-center bg-cover bg-profile-blob"
        }
    }

    const filterBySelf = (post) => {
        if (post?.username === profileData?.username) {
            return true
        }
        return false
    }

    return (
        <div className="feed__page h-full bg-[#f1f1f1]">
            <Navbar />
            <div className="feed flex h-full my-0 ">
                <LeftSIdeBar />
                <div className=" z-0 posts 2xl:min-w-[52.5rem] lg:w-[42rem] h-[calc(100vh-6.75rem)] sm:h-[calc(100vh-3.75rem)]  bg-[#f1f1f1] flex-grow overflow-y-auto flex flex-col items-center justify-start  px-2 sm:px-0 gap-8">
                    {profileData?.username && <>
                        <div className={`user__profile ${selectbg()} min-h-[30rem] mt-4  relative px-[2.3rem] gap-4 py-[1.12rem] shadow-[0px_4px_8px_-4px_rgba(0,0,0,0.25)] rounded-[10px] bg-white flex flex-col justiy-center w-full  sm:w-[20rem] lg:w-[30rem] xl:w-[40rem] 2xl:w-[50rem]`}>

                            {userData?.username === profileData.username &&
                                <button onClick={() => setOpenEditProfile(true)} className="edit__button absolute rounded-sm hover:bg-[#4e49bd] top-[5%] text-white w-[5rem] h-[2rem] bg-[#6C63FF] shadow-[0px_10px_20px_-10px_#6C63FF] left-[3%] ">EDIT</button>}
                            {openEditProfile && <EditProfileDialog profileData={profileData} />}


                            {userData?.username !== profileData?.username &&
                                <button
                                    onClick={followHandler}
                                    className="edit__button absolute rounded-sm hover:bg-[#4e49bd] top-[5%] text-white w-[6rem] h-[2rem] bg-[#6C63FF] shadow-[0px_10px_20px_-10px_#6C63FF] right-[3%] ">
                                    {!findUserinFollowList ? "Unfollow" : "Follow"}
                                </button>
                            }

                            <div className="profile__header  flex flex-col w-full items-center justify-star  gap-4">
                                <img className="w-[9.375rem] h-[9.375rem] object-center  object-cover rounded-full" src={imgUrl} alt={profileData.username} />
                                <div className="header__info flex-col flex gap-1 text-center w-full">
                                    <h2 className="name drop-shadow-lg font-bold text-2xl capitalize text-center">{`${firstName} ${lastName}`}</h2>
                                    <p className="username text-slate-400 text-center lowercase">@{profileData.username}</p>
                                    {url && <a rel="noreferrer" target="_blank" className="url text-[#6C63FF] hover:text-[#9690ff] " href={url}>{url}</a>}
                                </div>
                            </div>
                            <div className="bottomInfo flex flex-col sm:flex-row w-full gap-2 sm:gap-[3rem]">
                                <div
                                    className="bio  p-4 rounded-lg backdrop-blur-md transition-all duration-100  shadow-[0px_10px_20px_-10px_rgba(0,0,0,0.25)]  bg-[rgba(235,235,235,0.31)] hover:bg-[rgba(235,235,235,0.50)] hover:backdrop-blur-lg">
                                    <p
                                        className="2xl:w-[31rem] xl:w-[20rem] sm:w-[10rem] w-full xl:text-sm lg:text-xs flex-wrap sm:h-[7.4rem] h-full tracking-tighter overflow-hidden break-words ">{bio ? bio : <span className="text-slate-400 font-mono capitalize">Bio Not Added</span>}</p>
                                </div>
                                <div
                                    className="profile__counts px-4 rounded-lg transition-all duration-100 shadow-[0px_10px_20px_-10px_rgba(0,0,0,0.25)]   backdrop-blur-md hover:backdrop-blur-lg hover:bg-[rgba(235,235,235,0.50)] bg-[rgba(235,235,235,0.31)] text-black  text-sm grid grid-cols-3 grid-rows-2 py-1 sm:py-[1.7rem] w-full gap-x-[1.3rem] gap-y-[1.19rem] place-content-center items-center justify-center">
                                    <p className="text-left col-span-2  font-semibold capitalize drop-shadow-lg">Followers</p>
                                    <h1 className="text-right font-black drop-shadow-lg">{followers.length}</h1>

                                    <p className="text-left col-span-2 font-semibold capitalize  drop-shadow-lg">Following</p>
                                    <h1 className="text-right font-black drop-shadow-lg">{following.length}</h1>
                                </div>
                            </div>
                        </div>

                        <ul className="postsContainer container flex flex-col gap-[15px] items-center justify-start mb-4 ">

                            {allPosts?.filter((post) => filterBySelf(post)).map((post) => {
                                return <Post key={post._id} post={post} />
                            })}

                            {userData?.username === profileData.username && allPosts?.filter((post) => filterBySelf(post)).length === 0 &&
                                <div className="notDataFound mt-8">
                                    <h1 className="text-5xl w-full text-center drop-shadow-lg">&lt; Why So <span className="text-[#6C63FF]">Empty</span>? &#47; &gt;</h1>
                                    <p className="text-lg w-full text-center capitalize text-slate-400 mt-1">Share your thoughts to see them here</p>
                                    <p
                                        className=" text-center text-slate-400 capitalize">Go to <span className="text-[#6C63FF] hover:text-[#4e49bd] bg-blue-100 rounded-lg px-2 py-1 pointer-events-none">&lt;button&gt; New Post  &lt;&#47;button&gt;</span> </p>
                                    <Lottie animationData={no_data_found} loop={true} />
                                </div>}
                        </ul>
                    </>
                    }
                </div>
                <Follow />
            </div>
            <MobNavbar />
        </div >
    )
}

export default Profile