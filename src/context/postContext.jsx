import { createContext, useContext, useEffect, useState } from "react";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
    const [allPosts, setAllPosts] = useState();



    useEffect(() => {
        const getAllPosts = async () => {
            await fetch("/api/posts")
                .then((res) => res.json())
                .then((data) => setAllPosts(data.posts))
        }
        getAllPosts();
    }, [])



    return <PostContext.Provider value={{ allPosts }}>
        {children}
    </PostContext.Provider>
}

export const usePostContext = () => useContext(PostContext);