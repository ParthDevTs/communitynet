import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuthContext } from "./AuthContext";



export const PostContext = createContext();

export const PostProvider = ({ children }) => {
    const [allPosts, setAllPosts] = useState([]);
    const [allUserPosts, setAllUserPOsts] = useState();
    const [selectedPostData, setSelectedPostData] = useState({});
    const [showPostLoading, setShowPostLoading] = useState(false)
    const { userName, setUserData, userData, getProfileDataFromParams, currentUserProfileId, isLoggedIn } = useAuthContext();
    const [allUsers, setAllUsers] = useState([])
    const [bookmarkedPosts, setBookmarkedPosts] = useState([])
    const [followList, setFollowList] = useState([])
    const [showNewPost, setShowNewPost] = useState(false)
    const [postforEditing, setPostForEditing] = useState();
    const [addNewPostMode, setAddNewPostMode] = useState("NEW__POST")

    const findFollowed = (user) => {

        const exists = userData.following.find(userfollowing => userfollowing._id === user._id)
        if (exists) {
            return false
        } else {
            return true
        }

    }
    const setUserGlobal = (userData) => {
        setUserData(userData);
        setFollowList(allUsers.filter((user) => findFollowed(user)).filter((user) => user.username !== userData.username))
    }


    const getSelectedPostData = async (postId) => {
        setShowPostLoading(true)
        await fetch(`/api/posts/${postId}`)
            .then(res => res.json())
            .then(data => {

                if (data.post) {
                    setSelectedPostData(data.post)
                    setShowPostLoading(false)
                    return true
                } else {
                    toast.error("The Selected Post may not exist")
                    setShowPostLoading(false)
                    return false
                }
            }).catch(error => {
                toast.error(error);
                setShowPostLoading(false)
                return false

            })
    }

    const likeaPost = async (postId) => {
        const id = toast.loading("Liking Post")
        if (!postId) {
            toast.error("invalid request")
        }
        const header = {
            authorization: localStorage.getItem("encodedToken"),
        };
        await fetch(`/api/posts/like/${postId}`, {
            method: "POST",
            headers: header,
        })
            .then(res => res.json())
            .then(data => {
                if (data.posts) {
                    setAllPosts(data.posts);
                    toast.update(id, {
                        render: `Liked Post`,
                        type: "success",
                        isLoading: false,
                        autoClose: true,
                        closeOnClick: true,
                        closeButton: "Close"
                    });
                } else {
                    toast.update(id, {
                        render: `Error while Liking`,
                        type: "Error",
                        isLoading: false,
                        autoClose: true,
                        closeOnClick: true,
                        closeButton: "Close"
                    });
                }

            })
            .catch(error => {
                console.error(error);
                toast.update(id, {
                    render: `Error While Liking`,
                    type: "Error",
                    isLoading: false,
                    autoClose: true,
                    closeOnClick: true,
                    closeButton: "Close"
                });
            })
    }
    const disLikedPost = async (postId) => {
        const id = toast.loading("Disliking Post")
        const header = {
            authorization: localStorage.getItem("encodedToken"),
        };

        await fetch(`/api/posts/dislike/${postId}`, {
            method: "POST",
            headers: header,
        })
            .then(res => res.json())
            .then(data => {
                if (data.posts) {
                    setAllPosts(data.posts);

                    toast.update(id, {
                        render: `Disliked Post`,
                        type: "info",
                        isLoading: false,
                        autoClose: true,
                        closeOnClick: true,
                        closeButton: "Close"
                    });
                } else {
                    toast.update(id, {
                        render: `Error while Disliking, try again later`,
                        type: "Error",
                        isLoading: false,
                        autoClose: true,
                        closeOnClick: true,
                        closeButton: "Close"
                    });
                }
            })
            .catch(error => {
                console.error(error);
                toast.update(id, {
                    render: `Error while Disliking`,
                    type: "Error",
                    isLoading: false,
                    autoClose: true,
                    closeOnClick: true,
                    closeButton: "Close"
                });
            })
    }


    const deletePost = async (postId) => {
        const id = toast.loading("Deleting Post")
        const header = {
            authorization: localStorage.getItem("encodedToken"),
        };

        await fetch(`/api/posts/${postId}`, {
            method: "DELETE",
            headers: header,
        })
            .then(res => res.json())
            .then(data => {
                if (data.posts) {
                    setAllPosts(data.posts);
                    toast.update(id, {
                        render: `Post Deleted`,
                        type: "info",
                        isLoading: false,
                        autoClose: true,
                        closeOnClick: true,
                        closeButton: "Close"
                    });
                }
                else {
                    toast.update(id, {
                        render: `Error Occured while deleting, try again`,
                        type: "error",
                        isLoading: false,
                        autoClose: true,
                        closeOnClick: true,
                        closeButton: "Close"
                    });
                }

            })
            .catch(error => console.error(error))
    }



    const findUserExistsinLiked = (likedby) => {
        const user = likedby.find(user => user.username === userName)
        return user ? true : false
    }


    const followUser = async (userId) => {
        const id = toast.loading("Following...")
        const header = {
            authorization: localStorage.getItem("encodedToken"),
        };
        await fetch(`/api/users/follow/${userId}`, {
            method: "POST",
            headers: header,
        })
            .then(res => res.json())
            .then(data => {
                if (data.user) {
                    setUserGlobal(data.user);
                    toast.update(id, {
                        render: `Following @${data.followUser.username}`,
                        type: "success",
                        icon: (({ theme, type }) =>
                            <img className="rounded-full object-center object-cover" src={data.followUser.imgUrl} alt={data.followUser.username} />),
                        isLoading: false,
                        autoClose: true,
                        closeOnClick: true,
                        closeButton: "Close"
                    });
                    getProfileDataFromParams(currentUserProfileId)
                } else {
                    toast.update(id, {
                        render: `error Occurred While following @${data.followUser.username}, try again`,
                        type: "error",
                        icon: (({ theme, type }) =>
                            <img className="rounded-full object-center object-cover" src={data.followUser.imgUrl} alt={data.followUser.username} />),
                        isLoading: false,
                        autoClose: true,
                        closeOnClick: true,
                        closeButton: "Close"
                    });
                }
            })
            .catch(error => {
                console.error(error);
                toast.update(id, {
                    render: "Some Error Occurred, try again later",
                    type: "error",
                    isLoading: false,
                    autoClose: true,
                    closeOnClick: true,
                    closeButton: "Close"
                });
            })
    }

    const unFollow = async (userId) => {
        const id = toast.loading("UnFollowing...")
        const header = {
            authorization: localStorage.getItem("encodedToken"),
        };
        await fetch(`/api/users/unfollow/${userId}`, {
            method: "POST",
            headers: header,
        })
            .then(res => res.json())
            .then(data => {
                setUserGlobal(data.user);

                toast.update(id, {
                    render: `UnFollowed @${data.followUser.username}`,
                    type: "info",
                    icon: (({ theme, type }) =>
                        <img className="rounded-full object-center object-cover" src={data.followUser.imgUrl} alt={data.followUser.username} />),
                    isLoading: false,
                    autoClose: true,
                    closeOnClick: true,
                    closeButton: "Close"
                });

                getProfileDataFromParams(currentUserProfileId)

            })
            .catch(error => {
                console.error(error);
                toast.update(id, {
                    render: "Some Error Occurred",
                    type: "error",
                    isLoading: false,
                    autoClose: true,
                    closeOnClick: true,
                    closeButton: "Close"
                });
            })
    }

    const bookmarkpost = async (postId) => {
        const header = {
            authorization: localStorage.getItem("encodedToken"),
        };


        await fetch(`/api/users/bookmark/${postId}`, {
            method: "POST",
            headers: header,
        })
            .then(res => res.json())
            .then(data => {

                setBookmarkedPosts(data.bookmarks)
                toast.dark("Post added to Bookmarks")

            })
            .catch(error => { console.error(error); })
    }
    const removeBookMark = async (postId) => {
        const header = {
            authorization: localStorage.getItem("encodedToken"),
        };

        await fetch(`/api/users/remove-bookmark/${postId}`, {
            method: "POST",
            headers: header,
        })
            .then(res => res.json())
            .then(data => {

                setBookmarkedPosts(data.bookmarks)

            })
            .catch(error => { console.error(error); })
    }

    const getAllbookmarks = async () => {
        const header = {
            authorization: localStorage.getItem("encodedToken"),
        };
        if (isLoggedIn) {
            await fetch("/api/users/bookmark/", { headers: header })
                .then((res) => res.json())
                .then((data) => {
                    if (data.bookmarks) { setBookmarkedPosts(data.bookmarks); }
                    else {
                        toast.error("Couldnt Bookmark, try again later")
                    }

                })
        }
    }

    const getAllPosts = async () => {
        if (isLoggedIn) {
            await fetch("/api/posts")
                .then((res) => res.json())
                .then((data) => {
                    if (data.posts) {
                        setAllPosts(data.posts);
                        setAllUserPOsts(data.posts.filter(post => findUserExistsinLiked(post.likes.likedBy)))
                    } else {
                        toast.error("Get posts, try again later")
                    }
                })
                .catch(error => console.error(error))
        }
    }
    const getallusers = async () => {
        if (isLoggedIn) {
            await fetch(" /api/users")
                .then(res => res.json())
                .then(data => { setAllUsers(data.users); })
                .catch(error => console.error(error))
        }
    }

    const addNewPost = async (values) => {

        const header = {
            authorization: localStorage.getItem("encodedToken"),
        };
        const postData = values
        setShowPostLoading(true)
        await fetch(`/api/posts/`, {
            method: "POST",
            headers: header,
            body: JSON.stringify({ postData })
        })
            .then(res => res.json())
            .then(data => {

                setAllPosts(data.posts);
                setAllUserPOsts(data.posts.filter(post => findUserExistsinLiked(post.likes.likedBy)))
                setShowPostLoading(false)
                return true
            })
            .catch(error => { console.error(error); setShowPostLoading(false); })
    }
    const editPost = async (values, postId) => {

        const header = {
            authorization: localStorage.getItem("encodedToken"),
        };
        const postData = values

        const id = toast.loading("Editing in Progress...")
        await fetch(`/api/posts/edit/${postId}`, {
            method: "POST",
            headers: header,
            body: JSON.stringify({ postData })
        })
            .then(res => res.json())
            .then(data => {
                setAllPosts(data.posts);
                setAllUserPOsts(data.posts.filter(post => findUserExistsinLiked(post.likes.likedBy)))
                toast.update(id, {
                    render: "Post Updated",
                    type: "success",
                    isLoading: false,
                    autoClose: true,
                    closeOnClick: true,
                    closeButton: "Close"
                });

                return true
            })
            .catch(error => {
                console.error(error);
                toast.update(id, {
                    render: "Some Error Occurred",
                    type: "error",
                    isLoading: false,
                    autoClose: true,
                    closeOnClick: true,
                    closeButton: "Close"
                });
            })

    }

    useEffect(() => {
        const handleLogin = () => {
            getAllPosts();
            getallusers();
            getAllbookmarks()
        }
        handleLogin()
        // eslint-disable-next-line
    }, [isLoggedIn, userData])



    const updateUserDataFromAuth = () => {
        setUserGlobal(userData)
    }


    useEffect(updateUserDataFromAuth
        // eslint-disable-next-line
        , [userData]);





    return <PostContext.Provider
        value={{
            setAllUsers,
            setBookmarkedPosts,
            getAllbookmarks,
            getallusers, getAllPosts,
            deletePost, unFollow,
            removeBookMark,
            bookmarkpost,
            bookmarkedPosts,
            followList,
            followUser,
            allUsers,
            disLikedPost,
            findUserExistsinLiked,
            likeaPost,
            showPostLoading,
            setShowPostLoading,
            allPosts,
            allUserPosts,
            selectedPostData,
            getSelectedPostData,
            showNewPost,
            setShowNewPost,
            addNewPost,
            postforEditing,
            setPostForEditing,
            addNewPostMode,
            setAddNewPostMode,
            editPost

        }}>

        {children}
    </PostContext.Provider>
}

export const usePostContext = () => useContext(PostContext);





    // useEffect(() => {
    //     const header = {
    //         authorization: localStorage.getItem("encodedToken"),
    //     };

    //     const getAllbookmarks = async () => {
    //         await fetch("/api/users/bookmark/", { headers: header })
    //             .then((res) => res.json())
    //             .then((data) => {

    //                 setBookmarkedPosts(data.bookmarks);
    //             })
    //     }

    //     const getAllPosts = async () => {
    //         await fetch("/api/posts")
    //             .then((res) => res.json())
    //             .then((data) => {
    //                 setAllPosts(data.posts);
    //                 setAllUserPOsts(data.posts.filter(post => findUserExistsinLiked(post.likes.likedBy)))
    //             })
    //     }
    //     const getallusers = async () => {
    //         await fetch(" /api/users").then(res => res.json()).then(data => { setAllUsers(data.users); console.log(data.users) }).catch(error => console.error(error))
    //     }
    //     getAllPosts();
    //     getallusers();
    //     getAllbookmarks();
    //     // eslint-disable-next-line
    // }, [userData])