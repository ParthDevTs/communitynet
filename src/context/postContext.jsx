import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuthContext } from "./AuthContext";



export const PostContext = createContext();

export const PostProvider = ({ children }) => {
    const [allPosts, setAllPosts] = useState([]);
    const [allUserPosts, setAllUserPOsts] = useState();
    const [selectedPostData, setSelectedPostData] = useState({});
    const [showPostLoading, setShowPostLoading] = useState(false)
    const { userName, setUserData, userData, getProfileDataFromParams, currentUserProfileId } = useAuthContext();
    const [allUsers, setAllUsers] = useState([])
    const [bookmarkedPosts, setBookmarkedPosts] = useState([])

    const [followList, setFollowList] = useState([])

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
            .catch(error => console.error(error))
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
            .catch(error => console.error(error))
    }

    const findUserExistsinLiked = (likedby) => {
        const user = likedby.find(user => user.username === userName)
        return user ? true : false
    }


    const followUser = async (userId) => {

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
                toast.success(`Following ${data.followUser.username}`, {
                    icon: (({ theme, type }) => <img className="rounded-full" src={data.followUser.imgUrl} alt={data.followUser.username}></img>)
                })

                getProfileDataFromParams(currentUserProfileId)
            })
            .catch(error => console.error(error))
    }

    const unFollow = async (userId) => {

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
                toast.info(`UnFollowed ${data.followUser.username}`, {
                    icon: (({ theme, type }) => <img className="rounded-full" src={data.followUser.imgUrl} alt={data.followUser.username}></img>)
                })

                getProfileDataFromParams(currentUserProfileId)

            })
            .catch(error => console.error(error))
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
                console.log(data.bookmarks)
                setBookmarkedPosts(data.bookmarks)
                toast.dark("Post added to Bookmarks")
                setShowPostLoading(false)
            })
            .catch(error => console.error(error))
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
                console.log(data.bookmarks)
                setBookmarkedPosts(data.bookmarks)
                toast.dark("Post removed from Bookmarks")
                setShowPostLoading(false)
            })
            .catch(error => console.error(error))
    }


    useEffect(() => {
        const header = {
            authorization: localStorage.getItem("encodedToken"),
        };

        const getAllbookmarks = async () => {
            await fetch("/api/users/bookmark/", { headers: header })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
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
            await fetch(" /api/users").then(res => res.json()).then(data => { setAllUsers(data.users); console.log(data.users) }).catch(error => console.error(error))
        }
        getAllPosts();
        getallusers();
        getAllbookmarks();
        // eslint-disable-next-line
    }, [userData])

    const updateUserDataFromAuth = () => {
        setUserGlobal(userData)

    }


    useEffect(updateUserDataFromAuth
        // eslint-disable-next-line
        , [userData]);




    return <PostContext.Provider value={{ unFollow, removeBookMark, bookmarkpost, bookmarkedPosts, followList, followUser, allUsers, disLikedPost, findUserExistsinLiked, likeaPost, showPostLoading, setShowPostLoading, allPosts, allUserPosts, selectedPostData, getSelectedPostData }}>
        {children}
    </PostContext.Provider>
}

export const usePostContext = () => useContext(PostContext);