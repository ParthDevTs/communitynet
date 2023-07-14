import React, { useEffect } from 'react'
import Navbar from '../components/Navbar';
import LeftSIdeBar from '../components/LeftSIdeBar';
import Follow from '../components/follow';
import { usePostContext } from '../context/postContext';
import Lottie from "lottie-react";
import { Post } from '../components/post';
import no_data_found from "../assets/no_data_found.json";
import MobNavbar from '../components/mobNavBar';
function Bookmarks() {

    const { bookmarkedPosts, setBookmarkedPosts } = usePostContext()
    document.title = `Community Net - BookMarks`;

    useEffect(() => {
        const getAllbookmarks = async () => {
            const header = {
                authorization: localStorage.getItem("encodedToken"),
            };

            await fetch("/api/users/bookmark/", { headers: header })
                .then((res) => res.json())
                .then((data) => {

                    setBookmarkedPosts(data.bookmarks);
                })
        }

        getAllbookmarks()
        // eslint-disable-next-line
    }, [])



    return (
        <div className="bookmarks__page h-full bg-[#f1f1f1] relative">
            <Navbar />
            <div className="bookmarks flex h-full ">
                <LeftSIdeBar />
                <div className="posts 2xl:min-w-[52.5rem] lg:w-[42rem] h-[calc(100vh-6.75rem)] sm:h-[calc(100vh-3.75rem)]  bg-[#f1f1f1] flex-grow overflow-y-auto flex flex-col items-center justify-start ">


                    <ul className="postsContainer mt-4 px-2 sm:px-0 relative container flex flex-col gap-[20px] items-center justify-start mb-4">
                        {bookmarkedPosts.length > 0 && bookmarkedPosts.map((post) => {
                            return <Post key={post._id} bookmarkMode={true} post={post} />
                        })}
                        {!bookmarkedPosts.length > 0 &&
                            <div className="notDataFound mt-8">
                                <h1 className="text-5xl w-full text-center  drop-shadow-lg">&lt; No <span className="text-[#6C63FF]">Bookmarks</span> Yet &#47; &gt;</h1>
                                <p className="text-lg w-full text-center capitalize text-slate-400">Add a bookmark to some posts to see them here</p>
                                <Lottie animationData={no_data_found} loop={true} />
                            </div>}
                    </ul>

                </div>
                <Follow />
            </div>
            <MobNavbar />
        </div >
    )
}

export default Bookmarks