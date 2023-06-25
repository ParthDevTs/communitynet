export const Post = ({ post }) => {

    const { _id, content, likes: { likeCount, likedBy, dislikedBy }, username, createdAt, updatedAt } = post;
    return <div className="post shadow-[0px_4px_8px_-4px_rgba(0,0,0,0.25)] rounded-[10px] bg-white pt-[0.56rem] pb-[1rem] px-[1.56rem] flex flex-col justiy-center gap-[1rem]">
        <header className="post__header gap-[1.5rem] flex h-[3.125rem] items-center">
            <img className="rounded-[50%] w-[3.125rem] h-[3.125rem]" src="data:image/png;base64,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" alt="user image" />
            <p className="text-[1rem] capitalize text-[#6C63FF] font-bold ">{username}</p>
        </header>
        <div className="postContent">
            <p className="text-[0.8rem]">{content}</p>
        </div>
        <div className="action__buttons flex items-center justify-evenly w-[47remrem] h-[1.875rem]">
            <button className="like__button">
                <svg className="h-[1.875rem] w-[1.875rem] hover:text-[#fe7575]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>

            </button>
            <button className="comment__button">
                <svg className="h-[1.875rem] w-[1.875rem] hover:text-[#fe7575]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>

            </button>
            <button className="bookmark__button">
                <svg className="h-[1.875rem] w-[1.875rem] hover:text-[#fe7575]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                    <path fill-rule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clip-rule="evenodd" />
                </svg>


            </button>
            <button className="send__button">
                <svg className="h-[1.875rem] w-[1.875rem] hover:text-[#fe7575]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>

            </button>
        </div>
    </div>
}