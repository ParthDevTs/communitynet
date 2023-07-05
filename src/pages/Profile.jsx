import React, { useEffect } from 'react'
import Navbar from '../components/Navbar';
import LeftSIdeBar from '../components/LeftSIdeBar';
import Follow from '../components/follow';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { Post } from '../components/post';
import { usePostContext } from '../context/postContext';
function Profile() {
    const { userID } = useParams()
    const { getProfileDataFromParams, profileData, userData, setCurrentUserProfileId, setShowLoading } = useAuthContext()
    const { allPosts } = usePostContext()

    const getUserData = () => {
        setShowLoading(true)
        getProfileDataFromParams(userID)
        setShowLoading(false)
    }
    useEffect(getUserData
        // eslint-disable-next-line
        , [userID])
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
                <div className="posts min-w-[52.5rem] h-[calc(100vh-5.75rem)]  bg-[#f1f1f1] flex-grow overflow-y-auto flex flex-col items-center justify-start  gap-8">
                    {profileData.username && <>
                        <div className={`user__profile ${selectbg()}   relative px-[2.3rem] gap-4 py-[1.12rem] shadow-[0px_4px_8px_-4px_rgba(0,0,0,0.25)] rounded-[10px] bg-white flex flex-col justiy-center lg:w-[50rem] max-w-[50rem]`}>

                            {userData.username === profileData.username &&
                                <button className="edit__button absolute rounded hover:bg-[#4e49bd] top-[5%] text-white w-[5rem] h-[2rem] bg-[#6C63FF] shadow-[0px_10px_20px_-10px_#6C63FF] left-[3%] ">EDIT</button>
                            }
                            <div className="profile__header  flex flex-col w-full items-center justify-star  gap-4">
                                <img className="w-[9.375rem] h-[9.375rem] rounded-full" src={imgUrl} alt={profileData.username} />
                                <div className="header__info flex-col flex gap-1 text-center w-full">
                                    <h2 className="name drop-shadow-lg font-bold text-2xl capitalize text-center">{`${firstName} ${lastName}`}</h2>
                                    <p className="username text-slate-400 text-center lowercase">@{profileData.username}</p>
                                    {url && <a rel="noreferrer" target="_blank" className="url text-[#6C63FF] hover:text-[#9690ff] " href={url}>{url}</a>}
                                </div>
                            </div>
                            <div className="bottomInfo flex w-full gap-[3rem]">
                                <div className="bio  p-4 rounded-lg backdrop-blur-md  shadow-[0px_10px_20px_-10px_rgba(0,0,0,0.25)]  bg-[rgba(235,235,235,0.31)]">
                                    <p className="w-[31rem] text-sm flex-wrap h-[7.4rem]">{bio ? bio : <span className="text-slate-400 font-mono capitalize">Bio Not Added</span>}</p>
                                </div>
                                <div className="profile__counts px-4 rounded-lg backdrop-blur-md  shadow-[0px_10px_20px_-10px_rgba(0,0,0,0.25)]  bg-[rgba(235,235,235,0.59)]  text-sm grid grid-cols-3 grid-rows-2 py-[1.7rem] w-full gap-x-[1.3rem] gap-y-[1.19rem] place-content-center items-center justify-center">
                                    <p className="text-left col-span-2 text-[#FE7575]">Followers</p>
                                    <p className="text-right">{followers.length}</p>

                                    <p className="text-left col-span-2 text-[#FE7575]">Following</p>
                                    <p className="text-right">{following.length}</p>
                                </div>
                            </div>
                        </div>
                        <div className="add__new__post__box w-[50rem] h-[7.735rem]  bg-white flex flex-col items-start justify-center gap-[0.69rem] px-[1.44rem] py-[1.06rem]">
                            <input type="text" name="newPostTxt" id="newPostTxt" placeholder="Whats On Your Mind?" className="whats__on__your__mind h-[3.125rem] w-[46.875rem] bg-[#f1f1f1] border-[transparent]" />
                            <div className="iconLIst rounded-[5px] bg-[#f1f1f1] shadow-[0px_4px_8px_-4px_rgba(0,0,0,0.25)] h-[1.875rem] w-[5.0625rem] grid grid-cols-2 place-content-center">
                                <button className="text-center grid place-content-center hover:text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                        <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
                                    </svg>
                                </button>
                                <button className="text-center grid place-content-center hover:text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <ul className="postsContainer mt-[1rem] container flex flex-col gap-[50px] items-center justify-start">

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