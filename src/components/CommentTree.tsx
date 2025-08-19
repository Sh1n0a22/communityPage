import { Button } from "@mui/material";
import type { Comment } from "../data/mockData";

interface CommentTreeProps {
    comments: Comment[];
    postId: number;
    expanded: Record<number, boolean>;
    toggleReplies: (id: number) => void;
    handleReplyAdding: (postId: number, commentId: number, replyId?: number) => void;
    parentAuthor?: string; 
}

export default function CommentTree({
    comments,
    postId,
    expanded,
    toggleReplies,
    handleReplyAdding,
    parentAuthor,
}: CommentTreeProps) {
    return (
        <>
            {comments.map(comment => (
                <div key={comment.id} className="mb-4">
                    <div className="bg-gray-50 p-3 rounded-md shadow-sm">
                        <p className="font-medium text-gray-800">{comment.author}</p>
                        <p className="text-gray-700 text-sm">
                            {parentAuthor && (
                                <span className="text-blue-600 font-medium mr-1">
                                    @{parentAuthor}
                                </span>
                            )}
                            {comment.text}
                        </p>

                        <div className="flex flex-wrap items-center gap-2 mt-2">
                            <Button
                                size="small"
                                variant="outlined"
                                onClick={() => handleReplyAdding(postId, comment.id)}
                            >
                                Reply
                            </Button>

                            {comment.replies && comment.replies.length > 0 && (
                                <Button
                                    size="small"
                                    variant="text"
                                    onClick={() => toggleReplies(comment.id)}
                                >
                                    {expanded[comment.id]
                                        ? `Hide replies`
                                        : `View replies (${comment.replies.length})`}
                                </Button>
                            )}
                        </div>
                    </div>

                    {expanded[comment.id] &&comment.replies && comment.replies?.length > 0 && (
                        <div className="mt-2">
                            <CommentTree
                                comments={comment.replies}
                                postId={postId}
                                expanded={expanded}
                                toggleReplies={toggleReplies}
                                handleReplyAdding={(pid, cid, rid) =>
                                    handleReplyAdding(pid, comment.id, rid ?? cid)
                                }
                                parentAuthor={comment.author}
                            />
                        </div>
                    )}
                </div>
            ))}
        </>
    );
}
