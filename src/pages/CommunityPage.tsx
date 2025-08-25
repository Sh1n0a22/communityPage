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
        <div className="max-w-2xl rounded-xl mx-auto p-8 space-y-6 bg-gray-950 min-h-screen text-white">
            {/* Top bar */}
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
            <div className="flex justify-between items-center py-2 border-b border-gray-800">
                <h1 className="font-bold text-lg">Community</h1>
                <Button sx={{backgroundColor:"#1e40af",fontSize:"20px", width:"fit-content", borderRadius:"199px"}} variant="contained" onClick={() => setIsCreatePostModal(true)}>
                    +
                </Button>
            </div>

            {/* Posts */}
            {postData.map(post => (
                <section
                    key={post.id}
                    className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden shadow-sm"
                >
                    {/* Post header */}
                    <div className="flex items-center justify-between px-4 py-3">
                        <span className="font-semibold text-white">{post.author}</span>
                        <span className="text-gray-500 text-sm">•••</span>
                    </div>

                    {/* Post image & content */}
                    <div className="p-4">
                        <h2 className="text-white font-semibold text-lg">{post.title}</h2>
                        {post.img && (
                            <img
                                className="w-full max-h-[600px] my-4 object-cover rounded"
                                src={post.img}
                                alt={post.title}
                            />
                        )}
                        <p className="text-gray-300">{post.content}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-between px-4 py-3 text-sm font-medium text-white/80">
                        <div className="flex gap-4">
                            <span className="cursor-pointer hover:text-white"><img className="w-6" src="../../public/heart.png" alt="" />
                            </span>
                            <span
                                className="cursor-pointer hover:text-white"
                                onClick={() => handleCommentAdding(post.id)}
                            >
                                <img className="w-6" src="../../public/comment.png" alt="" />

                            </span>
                       
                        </div>
                        <span className="cursor-pointer hover:text-white">
                            <img className="w-6" src="../../public/save.png" alt="" />
                        </span>
                    </div>

                    {/* Comments */}
                    <div className="px-4 space-y-1">
                        {post.comments.length > 0 ? (
                            <>
                                <p
                                    className="text-sm text-gray-500 cursor-pointer hover:text-gray-300"
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
                            <p className="text-sm text-gray-500">No comments yet.</p>
                        )}
                    </div>

                    <div className="px-4 py-3 text-xs text-gray-500">2 HOURS AGO</div>
                </section>
            ))}
        </div>
    );
}
