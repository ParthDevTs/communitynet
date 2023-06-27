import { Link } from "react-router-dom"
import { usePostContext } from "../context/postContext"
import { Post } from "../components/post";
import { useAuthContext } from "../context/AuthContext";

export const Feed = () => {


    const { allPosts } = usePostContext();
    const { isLoggedIn, logOut } = useAuthContext();


    return <div className="feed__page h-full bg-[#f1f1f1]">
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
                <div className="filter__buttons py-[1.25rem] w-full flex items-center justify-center gap-[2.5rem]">
                    <button className="w-[18.75rem] h-[3.125rem] shadow-[10px_20px_10px_-10px_#FFB8B8B3] hover:text-slate-500 hover:bg-[#FFB8B8CC] text-white font-bold bg-[#FFB8B8] ">Trending</button>
                    <button className="w-[18.75rem] h-[3.125rem] shadow-[10px_20px_10px_-10px_rgba(0,0,0,0.15)] hover:bg-[rgba(0,0,0,0.15)] bg-white font-bold">Latest</button>
                </div>
                <ul className="postsContainer mt-[4rem] container flex flex-col gap-[50px] items-center justify-start">
                    {allPosts.map((post) => {
                        return <Post key={post._id} post={post} />
                    })}
                </ul>
            </div>
            <div className="follow bg-[#f1f1f1] h-full w-[18.75rem] grid place-content-center">
                <div className="follow__list rounded-[10px] bg-white h-[30rem] w-[13.1875rem] flex flex-col items-center justify-start px-[1.38rem] py-[1rem]">
                    <p>Follow</p>
                </div>
            </div>
        </div>
    </div >
}