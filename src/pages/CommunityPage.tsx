import { Button } from "@mui/material";
import { mockPosts } from "../db/mockData";
import { useState } from "react";
import AddPostModal from "../components/modals/AddPostModal";
import AddCommentModal from "../components/modals/AddCommentModal";
import AddReplyModal from "../components/modals/AddReplyModal";
import CommentTree from "../components/CommentTree";
import type { Post } from "../types/StoreTypes";

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
        <div className="max-w-xl mx-auto p-2 space-y-6">
            {/* Top bar */}
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <h1 className="font-bold text-lg">Community</h1>
                <Button variant="contained" onClick={() => setIsCreatePostModal(true)}>
                    +
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
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm"
                >
                    {/* Post header */}
                    <div className="flex items-center justify-between px-4 py-3">
                        <span className="font-semibold text-gray-800">{post.author}</span>
                        <span className="text-gray-400 text-sm">•••</span>
                    </div>




                    {/* Post image */}
                    {post.img ? (<div className="p-4">
                        <h2 className="text-black text-start font-semibold text-lg">{post.title}</h2>
                        <img
                            className="w-full max-h-[600px] my-4 object-cover"
                            src={post.img}
                            alt={post.title}
                        />
                        <p className="text-black/70 text-start">{post.content}</p>
                    </div>
                    ) : <div className="p-4">
                        <h2 className="text-black text-start font-semibold text-lg">{post.title}</h2>
                        <p className="text-black/70 text-start">{post.content}</p>
                    </div>}

                    {/* Action row (text instead of icons) */}
                    <div className="flex justify-between px-4 py-3 text-sm font-medium text-black" >
                        <div className="flex gap-4">
                            <span className="cursor-pointer hover:underline" >Like</span>
                            <span
                                className="cursor-pointer hover:underline"
                                onClick={() => handleCommentAdding(post.id)}
                            >
                                Comment
                            </span>
                            <span className="cursor-pointer hover:underline">Send</span>
                        </div>
                        <span className="cursor-pointer hover:underline">Save</span>
                    </div>

                    {/* Post content */}
                    <div className="px-4 space-y-1">
                        <p className="text-sm">
                            <span className="font-semibold mr-2">{post.author}</span>
                            {post.content}
                        </p>

                        {/* Comments preview */}
                        {post.comments.length > 0 ? (
                            <>
                                <p
                                    className="text-sm text-gray-500 cursor-pointer"
                                    onClick={() => toggleReplies(post.id)}
                                >
                                    View all {post.comments.length} comments
                                </p>
                                {expanded[post.id] && (
                                    <div className="mt-2">
                                        <CommentTree
                                            comments={post.comments}
                                            postId={post.id}
                                            expanded={expanded}
                                            toggleReplies={toggleReplies}
                                            handleReplyAdding={handleReplyAdding}
                                        />
                                    </div>
                                )}
                            </>
                        ) : (
                            <p className="text-sm text-gray-400">No comments yet.</p>
                        )}
                    </div>

                    <div className="px-4 py-3 text-xs text-gray-400">2 HOURS AGO</div>
                </section>
            ))}
        </div>
    );
}
