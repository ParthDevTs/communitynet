
import { usePostContext } from "../context/postContext"
import { Post } from "../components/post";
import { BarLoader } from "react-spinners";
import Navbar from "../components/Navbar";
import LeftSIdeBar from "../components/LeftSIdeBar";
import Follow from "../components/follow";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";
import dayjs from 'dayjs';

export const Feed = () => {


    const { allPosts, showPostLoading } = usePostContext();
    const { userData } = useAuthContext();
    const [sortingMethod, setSortingMethod] = useState("Trending")
    const filterByFollowing = (post) => {
        if (post.username === userData.username) {
            return true
        }
        const posterIsAFollower = userData.following.find((followed) => followed.username === post.username)
        if (posterIsAFollower) {
            return true
        } else {
            return false
        }
    }

    const sortlist = (first, second) => {
        switch (sortingMethod) {
            case "Trending":
                return first.likes.likeCount > second.likes.likeCount ? -1 : 1
            case "Latest":
                const a = dayjs(first.createdAt);
                const b = dayjs(second.createdAt)
                const diff = b.diff(a, "millisecond")
                console.log(diff)
                return diff > 0 ? 1 : -1
            default:
                return first.content.length > second.content.length ? 1 : -1
        }
    }


    return <div className="feed__page h-full bg-[#f1f1f1] relative">
        {showPostLoading && <div className="loader z-[99] absolute h-screen w-full bg-black/40 grid place-content-center">

            <BarLoader
                color="#FE7575"
                loading
                speedMultiplier={1.5}
                cssOverride={{
                    width: '50rem'
                }}
            />
        </div>}
        <Navbar />
        <div className="feed flex h-full my-4">
            <LeftSIdeBar />
            <div className="posts min-w-[52.5rem] h-[calc(100vh-5.75rem)]  bg-[#f1f1f1] flex-grow overflow-y-auto flex flex-col items-center justify-start ">


                <div className="filter__buttons py-[1.25rem] w-full flex items-center justify-center gap-[2.5rem]">
                    <button onClick={() => setSortingMethod("Trending")} className="w-[18.75rem] transition-all h-[3.125rem] shadow-[0px_20px_10px_-10px_#FFB8B8B3] hover:text-slate-500 hover:bg-[#FFB8B8CC] text-white font-bold bg-[#FFB8B8] ">Trending</button>
                    <button onClick={() => setSortingMethod("Latest")} className="w-[18.75rem] transition-all h-[3.125rem] shadow-[0px_10px_20px_-10px_#6b63ff] hover:bg-[rgba(0,0,0,0.15)] hover:text-white bg-white font-bold">Latest</button>
                </div>
                <div className="sorting__details mt-8 gap-2  flex flex-col ">
                    <p className="drop-shadow-xs font-semibold text-slate-400">Sorting by: <span className={`text-lg transition-all ml-4 ${sortingMethod === "Trending" ? "text-[#FFB8B8]" : "text-[#6b63ff]"}`}>{sortingMethod}</span></p>
                    <div className="seperator w-full lg:w-[50rem] h-[1px] bg-black"></div>
                </div>
                <ul className="postsContainer mt-[2rem] relative container flex flex-col gap-[15px] items-center justify-start">

                    {allPosts.filter((post) => filterByFollowing(post)).sort((first, second) => sortlist(first, second)).map((post) => {
                        return <Post key={post._id} post={post} />
                    })}
                </ul>
            </div>
            <Follow />
        </div>
    </div >
}