import React, { useState } from 'react'
import { usePostContext } from '../context/postContext'



function PostDelDropDown({ postId, post }) {
    const [showDrpDwn, setShowDrpDown] = useState(false)
    const { deletePost, setShowNewPost, setPostForEditing, setAddNewPostMode } = usePostContext()
    const deletePostHandler = () => {
        deletePost(postId);
        setShowDrpDown(false)
    }
    const editPostHandler = () => {
        setAddNewPostMode("EDIT__POST")
        setPostForEditing(post)
        setShowNewPost(true)
        setShowDrpDown(false)
    }
    return (
        <div className="relative">
            <button onClick={() => setShowDrpDown(!showDrpDwn)} className="p-4 lg:w-[5rem] xl:w-[12rem] sm:w-[3rem] flex items-center justify-end tracking-wider border-transparent active:border-slate-500 duration-300 active:text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
            </button>


            {showDrpDwn && (
                <div className="bg-white  box-border border  absolute top-[40px] backdrop-filter backdrop-blur-xl shadow-lg w-[12rem]  flex flex-col  rounded-sm right-3 py-2 ">
                    <button onClick={deletePostHandler} className="del__button py-2 text-slate-600 flex px-4  items-center justify-start w-full   text-sm hover:bg-slate-100 ">
                        <p className=" drop-shadow-lg">Delete Post</p>
                        <div className="spacer flex-grow"></div>
                        <span className=" drop-shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </span>
                    </button>
                    <button onClick={editPostHandler} className="edit__button py-2 px-4 text-slate-600 flex  items-center justify-center w-full text-sm hover:bg-slate-100 ">
                        <p className=" drop-shadow-lg">Edit Post</p>
                        <div className="spacer flex-grow"></div>
                        <span className=" drop-shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                            </svg>
                        </span>
                    </button>

                </div>
            )}
        </div>
    )
}

export default PostDelDropDown