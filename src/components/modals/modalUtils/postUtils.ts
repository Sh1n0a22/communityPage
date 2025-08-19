import type { Comment, Post } from "../../../data/mockData"

interface AddPostProps {
    postTitle: React.RefObject<HTMLInputElement | null>
    postContent: React.RefObject<HTMLInputElement | null>
    postImgUrl: React.RefObject<HTMLInputElement | null>
    PostData: Post[],
    updatePostData: (dataToUpd: Post[]) => void
}

interface AddReplyProps {
    replyContent: React.RefObject<HTMLInputElement | null>
    postId: number | null
    commentId: number | null
    updatePostData: React.Dispatch<React.SetStateAction<Post[]>>
    innerReplyId: number | null,
}

interface AddCommentProps {
    postId: number | null
    postContent: React.RefObject<HTMLInputElement | null>
    updatePostData:React.Dispatch<React.SetStateAction<Post[]>>
}

export const addPost = ({ postTitle, postContent, postImgUrl, updatePostData, PostData }: AddPostProps) => {

    if (postTitle.current && postContent.current) {
        const postTemplate: Post = {
            id: Date.now(),
            img: postImgUrl.current?.value || "", // empty string if no image
            title: postTitle.current.value,
            content: postContent.current.value,
            author: "User",
            comments: [],
            createdAt: Date.now().toString()
        }
        updatePostData([...PostData, postTemplate])
    }
}


export const addReply = ({ postId, commentId, replyContent, updatePostData,innerReplyId }: AddReplyProps) => {
    if (!postId || !commentId || !replyContent.current?.value) return;

    const newReply: Comment = {
        id: Date.now(),
        author: "User" + Date.now(),
        text: replyContent.current.value,
        createdAt: new Date().toISOString(),
        replies: [],
    };

    // recursiveAddReply like we have post then it search for comments if comment exist it checks whether it has reply than it checks id if id didnt match and reply array for this array isnt empty it goes depper into array by calling recursiveAddReply again with new params else it just returns reply

    const recursiveAddReply = (replies: Comment[] | undefined, targetId: number): Comment[] => {
        if (!replies) return [];
        return replies.map(reply => {
            if (reply.id === targetId) {
                return {
                    ...reply,
                    replies: [...(reply.replies ?? []), newReply],
                };
            }
            if (reply.replies?.length) {
                return {
                    ...reply,
                    replies: recursiveAddReply(reply.replies, targetId),
                };
            }
            return reply;
        });
    };
    // so addReply just check if innerReplyId exist it start finding procces with recursiveAddReply
    // else it means that it its outer comment and than it just adds reply for this comment
    updatePostData(prevData =>
        prevData.map(post => {
            if (post.id !== postId) return post;

            return {
                ...post,
                comments: post.comments.map(comment => {
                    if (comment.id !== commentId) return comment;

                    if (innerReplyId) {

                        return {
                            ...comment,
                            replies: recursiveAddReply(comment.replies, innerReplyId),
                        };
                    } else {

                        return {
                            ...comment,
                            replies: [...(comment.replies ?? []), newReply],
                        };
                    }
                }),
            };
        })
    );

    replyContent.current.value = "";
};


  export const addComment = ({postId,postContent,updatePostData}:AddCommentProps) => {
        if (!postId) return;
        if (!postContent.current?.value.trim()) return; // prevent empty comments

        updatePostData(prevData =>
            prevData.map(post =>
                post.id === postId
                    ? {
                        ...post,
                        comments: [
                            ...post.comments,
                            {
                                id: Date.now(),
                                author: "User",
                                text: postContent.current!.value,
                                createdAt: new Date().toISOString(),
                                replies: [],
                            },
                        ],
                    }
                    : post
            )
        );
        
    };
