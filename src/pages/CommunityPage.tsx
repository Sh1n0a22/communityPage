import { Button } from "@mui/material";
import { mockPosts, type Post, type Comment } from "../data/mockData";
import { useState } from "react";
import AddPostModal from "../components/modals/AddPostModal";
import AddCommentModal from "../components/modals/AddCommentModal";
import AddReplyModal from "../components/modals/AddReplyModal";
import CommentTree from "../components/CommentTree";

export default function CommunityPage() {
    const [expanded, setExpanded] = useState<Record<number, boolean>>({});
    const [isCreatePostModal, setIsCreatePostModal] = useState(false);
    const [isCreateCommentModal, setIsCreateCommentModal] = useState(false);
    const [isCreateReplyModal, setIsCreateReplyModal] = useState(false);

    const [selectedInnerReplyId, setSelectedInnerReplyId] = useState<number | null>(null);
    const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
    const [selectedCommentId, setSelectedCommentId] = useState<number | null>(null);

    const [postData, setPostData] = useState<Post[]>(mockPosts);

    const toggleReplies = (id: number) => {
        setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleCommentAdding = (postId: number) => {
        setSelectedPostId(postId);
        setIsCreateCommentModal(true);
    };

    const handleReplyAdding = (postId: number, commentId: number, replyId?: number) => {
        setSelectedPostId(postId);
        setSelectedCommentId(commentId);
        setSelectedInnerReplyId(replyId ?? null);
        setIsCreateReplyModal(true);
    };

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-8">
            <div className="flex justify-end">
                <Button variant="contained" onClick={() => setIsCreatePostModal(true)}>
                    Create New Post
                </Button>
            </div>

            <AddPostModal
                PostData={postData}
                updatePostData={setPostData}
                isOpened={isCreatePostModal}
                CloseModal={() => setIsCreatePostModal(false)}
            />

            <AddCommentModal
                postId={selectedPostId}
                PostData={postData}
                updatePostData={setPostData}
                isOpened={isCreateCommentModal}
                CloseModal={() => setIsCreateCommentModal(false)}
            />

            <AddReplyModal
                innerReplyId={selectedInnerReplyId}
                commentId={selectedCommentId}
                postId={selectedPostId}
                updatePostData={setPostData}
                isOpened={isCreateReplyModal}
                CloseModal={() => setIsCreateReplyModal(false)}
            />

            {postData.map(post => (
                <section
                    key={post.id}
                    className="bg-white shadow-md rounded-lg p-6 space-y-4 transition hover:shadow-lg"
                >
                    {post.img && <div className="flex justify-center">
                        <img className="w-full sm:w-fit self-center" src={post.img}  />
                    </div>}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                        <h1 className="text-xl font-bold text-gray-800">{post.title}</h1>
                        <span className="text-gray-500 text-sm">{post.author}</span>
                    </div>

                    <p className="text-gray-700 leading-relaxed">{post.content}</p>
                    <Button
                        variant="outlined"
                        onClick={() => handleCommentAdding(post.id)}
                        className="!mt-2"
                    >
                        Comment this Post
                    </Button>

                    <div>
                        <h2 className="font-semibold mb-2 text-gray-800">Comments</h2>
                        {post.comments.length > 0 ? (
                            <CommentTree
                                comments={post.comments}
                                postId={post.id}
                                expanded={expanded}
                                toggleReplies={toggleReplies}
                                handleReplyAdding={handleReplyAdding}
                            />
                        ) : (
                            <p className="text-gray-500 text-sm">
                                No comments yet. Be the first to comment.
                            </p>
                        )}
                    </div>
                </section>
            ))}
        </div>
    );
}

