import React from 'react'
import { usePostContext } from '../context/postContext';
import { Post } from '../components/post';
import Navbar from '../components/Navbar';
import LeftSIdeBar from '../components/LeftSIdeBar';
import Follow from '../components/follow';
import MobNavbar from '../components/mobNavBar';

function Explore() {
    document.title = `Community Net - Explore`;

    const { allPosts } = usePostContext();

    return (
        <div className="feed__page h-full bg-[#f1f1f1]">
            <Navbar />
            <div className="feed flex h-full ">
                <LeftSIdeBar />
                <div className="posts 2xl:min-w-[52.5rem] lg:w-[42rem]  h-[calc(100vh-6.75rem)] sm:h-[calc(100vh-3.75rem)]  bg-[#f1f1f1] flex-grow overflow-y-auto flex flex-col items-center justify-start ">

                    <ul className="postsContainer mt-3 px-2 sm:px-0 mb-4  container flex flex-col gap-[20px] items-center justify-start ">
                        {allPosts.map((post) => {
                            return <Post key={post._id} post={post} />
                        })}
                    </ul>
                </div>
                <Follow />
            </div>
            <MobNavbar />
        </div >
    )
}

export default Explore