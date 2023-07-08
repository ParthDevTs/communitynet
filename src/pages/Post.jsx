import React, { useEffect } from 'react'
import Navbar from '../components/Navbar';
import LeftSIdeBar from '../components/LeftSIdeBar';
import { useParams } from 'react-router-dom';
import { usePostContext } from '../context/postContext';
import { Post } from '../components/post';
import Follow from '../components/follow';


function PostView() {
    document.title = "Community Net - Post";


    const { postId } = useParams();
    const { getSelectedPostData, selectedPostData } = usePostContext();

    useEffect(() => {

        getSelectedPostData(postId)

    }, [postId, getSelectedPostData])


    return (
        <div className="feed__page h-full bg-[#f1f1f1]">
            <Navbar />
            <div className="feed flex h-full my-4">
                <LeftSIdeBar />
                <div className="posts 2xl:min-w-[52.5rem] lg:w-[42rem] h-[calc(100vh-5.75rem)]  bg-[#f1f1f1] flex-grow overflow-y-auto flex flex-col items-center justify-start ">
                    <div className="postsContainer  container flex flex-col gap-[50px] items-center justify-start">
                        {selectedPostData.content && <Post post={selectedPostData} />}
                    </div>
                </div>
                <Follow />
            </div>
        </div >
    )
}

export default PostView