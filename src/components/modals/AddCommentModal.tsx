import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import type { Post } from "../../data/mockData";
import { useRef } from "react";


interface AddCommentModalProps {
    CloseModal: () => void
    isOpened: boolean,
    postId: number | null,
    PostData: Post[],
    updatePostData: React.Dispatch<React.SetStateAction<Post[]>>
}

export default function AddCommentModal({ CloseModal, isOpened, updatePostData, postId }: AddCommentModalProps) {
    const postContent = useRef<HTMLInputElement>(null)

    const addComment = () => {
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
        
        CloseModal();
    };



    return (
        <Dialog
            open={isOpened}
            onClose={CloseModal}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle sx={{ fontWeight: "bold" }}>Add Comment</DialogTitle>

            <DialogContent dividers sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

                <TextField
                    required
                    inputRef={postContent}
                    label="Content"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                />
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
                <Button onClick={CloseModal} variant="outlined" color="secondary">
                    Cancel
                </Button>
                <Button
                    type="submit"
                    onClick={addComment}
                    variant="contained"
                    color="primary"
                >
                    Add comment
                </Button>
            </DialogActions>
        </Dialog>
    )
} 