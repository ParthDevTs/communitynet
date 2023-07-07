import React, { useEffect } from 'react'
import Navbar from '../components/Navbar';
import LeftSIdeBar from '../components/LeftSIdeBar';
import Follow from '../components/follow';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { Post } from '../components/post';
import { usePostContext } from '../context/postContext';
import EditProfileDialog from '../components/editProfileDialog';
function Profile() {
    const { userID } = useParams()
    const navigate = useNavigate()


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
            followUser(profileData._id)
        } else {
            unFollow(profileData._id)
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
        if (!profileData) { navigate("/") }
        // eslint-disable-next-line
    }, [])

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
                return "bg-no-repeat bg-center bg-cover bg-profile-blob"
            case "poly":
                return "bg-no-repeat bg-center bg-cover bg-profile-poly"
            default:
                return "bg-no-repeat bg-center bg-cover bg-profile-blob"
        }
    }

    const filterBySelf = (post) => {
        if (post.username === profileData.username) {
            return true
        }
        return false
    }

    return (
        <div className="feed__page h-full bg-[#f1f1f1]">
            <Navbar />
            <div className="feed flex h-full my-4">
                <LeftSIdeBar />
                <div className=" z-0 posts min-w-[52.5rem] h-[calc(100vh-5.75rem)]  bg-[#f1f1f1] flex-grow overflow-y-auto flex flex-col items-center justify-start  gap-8">
                    {profileData.username && <>
                        <div className={`user__profile ${selectbg()}   relative px-[2.3rem] gap-4 py-[1.12rem] shadow-[0px_4px_8px_-4px_rgba(0,0,0,0.25)] rounded-[10px] bg-white flex flex-col justiy-center lg:w-[50rem] max-w-[50rem]`}>

                            {userData.username === profileData.username &&
                                <button onClick={() => setOpenEditProfile(true)} className="edit__button absolute rounded-sm hover:bg-[#4e49bd] top-[5%] text-white w-[5rem] h-[2rem] bg-[#6C63FF] shadow-[0px_10px_20px_-10px_#6C63FF] left-[3%] ">EDIT</button>}
                            {openEditProfile && <EditProfileDialog profileData={profileData} />}


                            {userData.username !== profileData.username &&
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
                            <div className="bottomInfo flex w-full gap-[3rem]">
                                <div className="bio  p-4 rounded-lg backdrop-blur-md  shadow-[0px_10px_20px_-10px_rgba(0,0,0,0.25)]  bg-[rgba(235,235,235,0.31)]">
                                    <p className="w-[31rem] text-sm flex-wrap h-[7.4rem] tracking-tighter overflow-hidden break-words ">{bio ? bio : <span className="text-slate-400 font-mono capitalize">Bio Not Added</span>}</p>
                                </div>
                                <div className="profile__counts px-4 rounded-md backdrop-blur-md  shadow-[0px_10px_20px_-10px_rgba(0,0,0,0.45)]  bg-[rgba(1,1,1,0.35)] text-white  text-sm grid grid-cols-3 grid-rows-2 py-[1.7rem] w-full gap-x-[1.3rem] gap-y-[1.19rem] place-content-center items-center justify-center">
                                    <p className="text-left col-span-2 text-white font-semibold uppercase">Followers</p>
                                    <p className="text-right">{followers.length}</p>

                                    <p className="text-left col-span-2 text-white font-semibold uppercase ">Following</p>
                                    <p className="text-right">{following.length}</p>
                                </div>
                            </div>
                        </div>

                        <ul className="postsContainer container flex flex-col gap-[15px] items-center justify-start">

                            {allPosts.filter((post) => filterBySelf(post)).map((post) => {
                                return <Post key={post._id} post={post} />
                            })}
                        </ul>
                    </>
                    }
                </div>
                <Follow />
            </div>
        </div >
    )
}

export default Profile