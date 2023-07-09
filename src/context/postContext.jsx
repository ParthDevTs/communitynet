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
        if (!postId) {
            toast("invalid request")
        }
        const header = {
            authorization: localStorage.getItem("encodedToken"),
        };
        setShowPostLoading(true)

        await fetch(`/api/posts/like/${postId}`, {
            method: "POST",
            headers: header,
        })
            .then(res => res.json())
            .then(data => { setAllPosts(data.posts); setShowPostLoading(false); toast.dark("Liked Post") })
            .catch(error => { console.error(error); setShowPostLoading(false); })
    }
    const disLikedPost = async (postId) => {
        const header = {
            authorization: localStorage.getItem("encodedToken"),
        };

        setShowPostLoading(true)
        await fetch(`/api/posts/dislike/${postId}`, {
            method: "POST",
            headers: header,
        })
            .then(res => res.json())
            .then(data => { setAllPosts(data.posts); setShowPostLoading(false); toast.dark("Disliked Post") })
            .catch(error => { console.error(error); setShowPostLoading(false); })
    }


    const deletePost = async (postId) => {
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
                    setAllPosts(data.posts); toast.dark("Post Deleted")
                }
                else {
                    toast.error("Some Error Occurred, please try again later")
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
                setUserGlobal(data.user);

                toast.update(id, {
                    render: `Following @${data.followUser.username}`,
                    type: "success",
                    icon: (({ theme, type }) =>
                        <img className="rounded-full" src={data.followUser.imgUrl} alt={data.followUser.username} />),
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
                        <img className="rounded-full" src={data.followUser.imgUrl} alt={data.followUser.username} />),
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

        setShowPostLoading(true)
        await fetch(`/api/users/bookmark/${postId}`, {
            method: "POST",
            headers: header,
        })
            .then(res => res.json())
            .then(data => {

                setBookmarkedPosts(data.bookmarks)
                toast.dark("Post added to Bookmarks")
                setShowPostLoading(false)
            })
            .catch(error => { console.error(error); setShowPostLoading(true) })
    }
    const removeBookMark = async (postId) => {
        const header = {
            authorization: localStorage.getItem("encodedToken"),
        };

        setShowPostLoading(true)
        await fetch(`/api/users/remove-bookmark/${postId}`, {
            method: "POST",
            headers: header,
        })
            .then(res => res.json())
            .then(data => {

                setBookmarkedPosts(data.bookmarks)
                toast.dark("Post removed from Bookmarks")
                setShowPostLoading(false)
            })
            .catch(error => { console.error(error); setShowPostLoading(false) })
    }

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

    const getAllPosts = async () => {
        await fetch("/api/posts")
            .then((res) => res.json())
            .then((data) => {
                setAllPosts(data.posts);
                setAllUserPOsts(data.posts.filter(post => findUserExistsinLiked(post.likes.likedBy)))
            })
    }
    const getallusers = async () => {
        await fetch(" /api/users")
            .then(res => res.json())
            .then(data => { setAllUsers(data.users); })
            .catch(error => console.error(error))
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
    }, [isLoggedIn])



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