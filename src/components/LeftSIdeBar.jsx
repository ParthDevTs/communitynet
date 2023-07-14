import React from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import { useAuthContext } from '../context/AuthContext';
import { usePostContext } from '../context/postContext';
function LeftSIdeBar() {
    const navigate = useNavigate();
    const { setShowNewPost, setAddNewPostMode } = usePostContext()
    const { userData } = useAuthContext();
    const getActiveStyle = ({ isActive }) => ({
        color: isActive ? "#6C63FF" : "",
    });

    const NwwPostHandler = () => {
        setShowNewPost(true)
        setAddNewPostMode("NEW__POST")
    }
    return (
        <div className="left__nav bg-[#f1f1f1]   w-[18.75rem] px-[42px] hidden  sm:flex flex-col items-center justify-between border-r">
            <div className="feed__nav__links container w-[13.1875rem] h-[15rem] rounded-[10px]  text-black flex flex-col items-start justify-center px-[40px] gap-[20px]">
                <NavLink style={getActiveStyle} className="navLinks drop-shadow-lg flex gap-2 items-center text-left text-[1rem] font-semibold hover:text-[#9690ff] " to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                        <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                    </svg>
                    Feed
                </NavLink>
                <NavLink style={getActiveStyle} className="navLinks drop-shadow-lg flex gap-2 items-center text-left text-[1rem] font-semibold hover:text-[#9690ff] " to="/explore">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" clipRule="evenodd" />
                        <path d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z" />
                    </svg>
                    Explore
                </NavLink>
                <NavLink style={getActiveStyle} className="navLinks drop-shadow-lg flex gap-2 items-center text-left text-[1rem] font-semibold hover:text-[#9690ff] " to="/bookmarks">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />
                    </svg>
                    Bookmarks
                </NavLink>
                <NavLink style={getActiveStyle} className="navLinks drop-shadow-lg flex gap-2 items-center text-left text-[1rem] font-semibold hover:text-[#9690ff] " to={`/profile/${userData._id}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                    </svg>
                    Profile
                </NavLink>
            </div>
            <div className="addnewPost my-8">
                <button
                    className="rounded text-sm hover:bg-[#4e49bd] text-white w-[8rem] h-[2rem] bg-[#6C63FF] shadow-[0px_10px_20px_-10px_#6C63FF]"
                    onClick={NwwPostHandler} >New Post</button>
            </div>
            <div className="spacer flex flex-grow"></div>
            <div className="userContainer flex gap-2 sm:mb-4">
                <img onClick={() => navigate(`/profile/${userData._id}`)} className="h-[3rem] w-[3rem] object-center object-cover  rounded-full cursor-pointer" src={userData?.imgUrl} alt={userData.firstName} />
                <div onClick={() => navigate(`/profile/${userData._id}`)} className="userDetails text-xs flex flex-col justify-center cursor-pointer ">
                    <p>{`${userData?.firstName} ${userData?.lastName}`}</p>
                    <p className="text-xs text-slate-500">{`@${userData.username}`}</p>
                </div>
            </div>
        </div>
    )
}

export default LeftSIdeBar