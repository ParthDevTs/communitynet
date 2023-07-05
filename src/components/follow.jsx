import React from 'react'
import { usePostContext } from '../context/postContext'
import { useAuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';

function Follow() {
    const { allUsers, followUser, unFollow } = usePostContext()
    const { userData } = useAuthContext();
    const navigate = useNavigate();


    const findFollowed = (user) => {
        const exists = userData.following.find(userfollowing => userfollowing._id === user._id)
        if (exists) {
            return false
        } else {
            return true
        }
    }

    const followHandler = (user) => {
        if (findFollowed(user)) {
            followUser(user._id)
        } else {
            unFollow(user._id)
        }
    }
    //.filter((user) => findFollowed(user))
    return (
        <div className="follow bg-[#f1f1f1] h-full w-[18.75rem] grid place-content-center">
            <div className="follow__list rounded-[10px] bg-white h-[30rem] w-[13.1875rem] flex flex-col items-center justify-start px-[1.38rem] py-[1rem]">
                <p className="capitalize text-[#6C63FF] font-semibold">Users to Follow</p>
                <ul className="follow__user__container container flex gap-5 flex-col mt-4">
                    {allUsers && allUsers.filter((user) => user.username !== userData.username).filter((user, index) => index <= 8 ? true : false).map(user => {
                        const { _id, username, imgUrl } = user;
                        return <li key={_id} className="flex items-center gap-2 ">

                            <img src={imgUrl} alt="" className="w-[2.5rem] h-[2.5rem] rounded-full" />
                            <p onClick={() => navigate(`/profile/${_id}`)} className="text-xs cursor-pointer flex-grow text-[#6C63FF] lowercase text-left">@{username}</p>

                            <button className="text-[#FFB8B8] hover:text-red-400" onClick={() => followHandler(user)}>
                                {findFollowed(user) ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                                </svg>
                                    : <svg xmlns="http://www.w3.org/2000/svg" fill="#FE7575" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                                    </svg>
                                }
                            </button>
                        </li>
                    })}
                    {allUsers.length === 0 ? <p>No More users to follow</p> : null}
                </ul>
            </div>
        </div>
    )
}

export default Follow