import React from 'react'
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const { isLoggedIn, logOut, userData } = useAuthContext();
    const navigate = useNavigate();
    return (
        <header className="top__header  h-[3.75rem] w-full px-[20px] py-[12px] bg-[#FFB8B82E] flex items-center justify-between ">
            <h1 onClick={() => navigate("/")} className="text-[24px] drop-shadow-lg cursor-pointer">
                Community
                <span className="text-[#6C63FF]">Net</span>
            </h1>
            <div className="spacer flex-grow"></div>
            <img
                onClick={() => navigate(`/profile/${userData._id}`)}
                className="h-[2rem] w-[2rem] block sm:hidden object-center object-cover  rounded-full cursor-pointer"
                src={userData?.imgUrl}
                alt={userData.firstName} />

            {isLoggedIn &&
                <button
                    onClick={() => logOut()}
                    className="text-[0.8rem]  transition shadow-xs text-black hover:text-white hover:bg-[#FFB8B8] p-[0.5rem] rounded-sm hover:shadow-[0px_4px_8px_-4px_#FFB8B8B3]">
                    Logout
                </button>
            }
        </header>
    )
}

export default Navbar