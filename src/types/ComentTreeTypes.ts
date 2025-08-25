import type { Comment } from "./StoreTypes";

export interface CommentTreeProps {
    comments: Comment[];
    postId: number;
    expanded: Record<number, boolean>;
    toggleReplies: (id: number) => void;
    handleReplyAdding: (postId: number, commentId: number, replyId?: number) => void;
    parentAuthor?: string; 
}