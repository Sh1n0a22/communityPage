import type { Post } from "./StoreTypes"


export interface AddPostProps {
    postTitle: React.RefObject<HTMLInputElement | null>
    postContent: React.RefObject<HTMLInputElement | null>
    postImgUrl: React.RefObject<HTMLInputElement | null>
    PostData: Post[],
    updatePostData: (dataToUpd: Post[]) => void
}

export interface AddReplyProps {
    replyContent: React.RefObject<HTMLInputElement | null>
    postId: number | null
    commentId: number | null
    updatePostData: React.Dispatch<React.SetStateAction<Post[]>>
    innerReplyId: number | null,
}

export interface AddCommentProps {
    postId: number | null
    postContent: React.RefObject<HTMLInputElement | null>
    updatePostData:React.Dispatch<React.SetStateAction<Post[]>>
}
