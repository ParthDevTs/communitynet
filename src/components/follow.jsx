import React from 'react'
import { usePostContext } from '../context/postContext'
import { useAuthContext } from '../context/AuthContext'

function Follow() {
    const { allUsers, followUser } = usePostContext()
    const { userData } = useAuthContext();


    const findFollowed = (user) => {
        const exists = userData.following.find(userfollowing => userfollowing._id === user._id)
        if (exists) {
            return false
        } else {
            return true
        }
    }
    return (
        <div className="follow bg-[#f1f1f1] h-full w-[18.75rem] grid place-content-center">
            <div className="follow__list rounded-[10px] bg-white h-[30rem] w-[13.1875rem] flex flex-col items-center justify-start px-[1.38rem] py-[1rem]">
                <p>Follow</p>
                <ul className="follow__user__container container flex gap-5 flex-col mt-4">
                    {allUsers && allUsers.filter((user) => findFollowed(user)).filter((user) => user.username !== userData.username).filter((user, index) => index <= 8 ? true : false).map(user => {
                        const { _id, username, imgUrl } = user;
                        return <li key={_id} className="flex items-center gap-2 ">

                            <img src={imgUrl} alt="" className="w-[2.5rem] h-[2.5rem] rounded-full" />
                            <p className="text-xs flex-grow text-[#6C63FF] lowercase text-center">{username}</p>

                            <button className="text-[#FFB8B8] hover:text-red-400" onClick={() => followUser(_id)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path strokeLinecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
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