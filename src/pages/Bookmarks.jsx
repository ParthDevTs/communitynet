import React, { useEffect } from 'react'
import Navbar from '../components/Navbar';
import LeftSIdeBar from '../components/LeftSIdeBar';
import Follow from '../components/follow';
import { usePostContext } from '../context/postContext';
import { Post } from '../components/post';
function Bookmarks() {

    const { bookmarkedPosts } = usePostContext()
    const fetchBookmarks = () => {
    }

    useEffect(fetchBookmarks, [])
    return (
        <div className="feed__page h-full bg-[#f1f1f1]">
            <Navbar />
            <div className="feed flex h-full my-4">
                <LeftSIdeBar />
                <div className="posts min-w-[52.5rem] h-[calc(100vh-5.75rem)]  bg-[#f1f1f1] flex-grow overflow-y-auto flex flex-col items-center justify-start ">


                    <ul className="postsContainer mt-[4rem] relative container flex flex-col gap-[50px] items-center justify-start">

                        {bookmarkedPosts && bookmarkedPosts.map((post) => {

                            return <Post key={post._id} bookmarkMode={true} post={post} />
                        })}
                    </ul>

                </div>
                <Follow />
            </div>
        </div >
    )
}

export default Bookmarks