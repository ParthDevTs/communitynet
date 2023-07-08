import React, { useEffect } from 'react'
import Navbar from '../components/Navbar';
import LeftSIdeBar from '../components/LeftSIdeBar';
import Follow from '../components/follow';
import { usePostContext } from '../context/postContext';
import Lottie from "lottie-react";
import { Post } from '../components/post';
import no_data_found from "../assets/no_data_found.json";
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
        <div className="feed__page h-full bg-[#f1f1f1]">
            <Navbar />
            <div className="feed flex h-full my-4">
                <LeftSIdeBar />
                <div className="posts min-w-[52.5rem] h-[calc(100vh-5.75rem)]  bg-[#f1f1f1] flex-grow overflow-y-auto flex flex-col items-center justify-start ">


                    <ul className="postsContainer  relative container flex flex-col gap-[15px] items-center justify-start">
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
        </div >
    )
}

export default Bookmarks