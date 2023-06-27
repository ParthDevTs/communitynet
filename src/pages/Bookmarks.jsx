import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext';
function Bookmarks() {

    const { isLoggedIn, logOut } = useAuthContext();
    return (
        <div className="feed__page h-full bg-[#f1f1f1]">
            <header className="top__header shadow h-[3.75rem] w-full px-[20px] py-[12px] bg-[#FFB8B82E] flex items-center justify-between">
                <h1 className="text-[24px] drop-shadow-md">
                    Community
                    <span className="text-[#6C63FF]">Net</span>
                </h1>
                <div className="spacer flex-grow"></div>
                {isLoggedIn && <button onClick={() => logOut()} className="text-[0.8rem] transition hover:bg-[#FFB8B8] p-[0.5rem] rounded-sm hover:shadow-[0px_4px_8px_-4px_#FFB8B8B3]">Logout</button>}
            </header>
            <div className="feed flex h-full my-4">
                <div className="left__nav bg-[#f1f1f1] h-full  w-[18.75rem] px-[42px]">
                    <div className="feed__nav__links container w-[13.1875rem] h-[15rem] rounded-[10px] bg-white text-[#6C63FF] flex flex-col items-start justify-center px-[60px] gap-[20px]">
                        <Link className="navLinks text-left text-[1rem] font-bold drop-shadow-sm" to="/">Home</Link>
                        <Link className="navLinks text-left text-[1rem] font-bold drop-shadow-sm" to="/explore">Explore</Link>
                        <Link className="navLinks text-left text-[1rem] font-bold drop-shadow-sm" to="/bookmarks">Bookmarks</Link>
                        <Link className="navLinks text-left text-[1rem] font-bold drop-shadow-sm" to="/profile">Profile</Link>
                    </div>
                </div>
                <div className="posts min-w-[52.5rem] h-[calc(100vh-5.75rem)]  bg-[#f1f1f1] flex-grow overflow-y-auto flex flex-col items-center justify-start ">

                    <ul className="postsContainer mt-[4rem] container flex flex-col gap-[50px] items-center justify-start">

                    </ul>
                </div>
                <div className="follow bg-[#f1f1f1] h-full w-[18.75rem] grid place-content-center">
                    <div className="follow__list rounded-[10px] bg-white h-[30rem] w-[13.1875rem] flex flex-col items-center justify-start px-[1.38rem] py-[1rem]">
                        <p>Follow</p>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Bookmarks