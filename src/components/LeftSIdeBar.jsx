import React from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import { useAuthContext } from '../context/AuthContext';
import { usePostContext } from '../context/postContext';
function LeftSIdeBar() {
    const navigate = useNavigate();
    const { setShowNewPost } = usePostContext()
    const { userData } = useAuthContext();
    const getActiveStyle = ({ isActive }) => ({
        color: isActive ? "#FFB8B8" : "",
    });
    return (
        <div className="left__nav bg-[#f1f1f1]   w-[18.75rem] px-[42px] flex flex-col items-center justify-between">
            <div className="feed__nav__links container w-[13.1875rem] h-[15rem] rounded-[10px] bg-white text-[#6C63FF] flex flex-col items-start justify-center px-[60px] gap-[20px]">
                <NavLink style={getActiveStyle} className="navLinks text-left text-[1rem] font-semibold hover:text-[#9690ff] drop-shadow-xs" to="/">Feed</NavLink>
                <NavLink style={getActiveStyle} className="navLinks text-left text-[1rem] font-semibold hover:text-[#9690ff] drop-shadow-xs" to="/explore">Explore</NavLink>
                <NavLink style={getActiveStyle} className="navLinks text-left text-[1rem] font-semibold hover:text-[#9690ff] drop-shadow-xs" to="/bookmarks">Bookmarks</NavLink>
                <NavLink style={getActiveStyle} className="navLinks text-left text-[1rem] font-semibold hover:text-[#9690ff] drop-shadow-xs" to={`/profile/${userData._id}`}>Profile</NavLink>
            </div>
            <div className="addnewPost my-8">
                <button
                    className="rounded text-sm hover:bg-[#4e49bd] text-white w-[8rem] h-[2rem] bg-[#6C63FF] shadow-[0px_10px_20px_-10px_#6C63FF]"
                    onClick={() => setShowNewPost(true)}>New Post</button>
            </div>
            <div className="spacer flex flex-grow"></div>
            <div className="userContainer flex gap-4">
                <img onClick={() => navigate(`/profile/${userData._id}`)} className="h-20 w-[3.75rem]  rounded-lg cursor-pointer" src={userData?.imgUrl} alt={userData.firstName} />
                <div onClick={() => navigate(`/profile/${userData._id}`)} className="userDetails flex flex-col justify-center cursor-pointer ">
                    <p>{`${userData?.firstName} ${userData?.lastName}`}</p>
                    <p className="text-xs font-bold text-slate-400">{`@${userData.username}`}</p>
                </div>
            </div>
        </div>
    )
}

export default LeftSIdeBar