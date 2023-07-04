import { useNavigate } from "react-router-dom";
import user__img from "../assets/user__placeholder.jpg";
import { usePostContext } from "../context/postContext";
import dayjs from 'dayjs';
export const Post = ({ post, bookmarkMode = false }) => {

    const navigate = useNavigate();
    const { likeaPost, findUserExistsinLiked, disLikedPost, bookmarkpost, removeBookMark } = usePostContext()

    const { _id, content, likes: { likedBy = [], ...rest }, username, createdAt, ...restitems } = post;
    const now = dayjs();
    const createdDateFormatted = dayjs(createdAt, "DD-MM-YYYY")
    // const updatedDateFormatted = dayjs(updatedAt, "DD-MM-YYYY")
    console.log(rest, restitems)

    const createddifferenceDay = now.diff(createdDateFormatted, "day")
    const createddifferenceMinute = now.diff(createdDateFormatted, "minute")

    const userExistsLiked = findUserExistsinLiked(likedBy)



    return <div className="post shadow-[0px_4px_8px_-4px_rgba(0,0,0,0.25)] rounded-[10px] bg-white pt-[0.56rem] pb-[1rem] px-[1.56rem] flex flex-col justiy-center gap-[1rem] lg:w-[50rem] max-w-[50rem] ">
        <header onClick={() => navigate(`/post/${_id}`)} className="post__header gap-[1rem] flex h-[3.125rem] items-center">
            <img className=" cursor-pointer rounded-[50%] w-[3.125rem] h-[3.125rem]" src={user__img} alt="user_image" />
            <h3 className="cursor-pointer text-[1rem] lowercase text-[#6C63FF] font-semibold drop-shadow-lg  ">{username}</h3>
            <p><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
            </svg>
            </p>
            <p className="text-xs text-slate-300">{`${createddifferenceMinute}m`} {createddifferenceDay !== 0 ? `${createddifferenceDay}d ` : null}ago</p>
        </header>
        <div className="postContent flex flex-col gap-4 w-full">
            <p className="text-[0.8rem] w-full bg-slate-100 py-3 px-2 rounded-lg ">{content}</p>
            {post.image &&
                <div onClick={() => navigate(`/post/${_id}`)} className="image__container flex-grow w-full grid place-content-center cursor-pointer" >
                    <img className="max-w-[740px] max-h-[540px] rounded-lg" src={post.image} alt={username} />
                </div>}
        </div>
        <div className="action__buttons flex items-center justify-evenly w-[47remrem] h-[1.875rem]">
            <button onClick={() => { userExistsLiked ? disLikedPost(_id) : likeaPost(_id) }} className={`like__button hover:text-[#fe7575] transition-colors ${userExistsLiked ? "text-red-600" : null}`}>
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>

            </button>
            <button className="comment__button hover:text-[#fe7575]">
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>

            </button>
            <button onClick={() => { !bookmarkMode ? bookmarkpost(_id) : removeBookMark(_id) }} className={`bookmark__button hover:text-[#fe7575] transition-colors ${bookmarkMode ? "text-red-600" : null}`}>
                <svg className=" w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" >
                    <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />
                </svg>


            </button>
            <button className="send__button hover:text-[#fe7575]">
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>

            </button>
        </div>
    </div>
}