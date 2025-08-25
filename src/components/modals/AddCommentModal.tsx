import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

import { useRef } from "react";
import { addComment } from "../../actions/postActions";
import type { Post } from "../../types/StoreTypes";


interface AddCommentModalProps {
    CloseModal: () => void
    isOpened: boolean,
    postId: number | null,
    PostData: Post[],
    updatePostData: React.Dispatch<React.SetStateAction<Post[]>>
}

export default function AddCommentModal({ CloseModal, isOpened, updatePostData, postId }: AddCommentModalProps) {
    const postContent = useRef<HTMLInputElement>(null)

    const handleCommentAdding = () => {
        addComment({postContent,postId,updatePostData})
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
                    onClick={handleCommentAdding}
                    variant="contained"
                    color="primary"
                >
                    Add comment
                </Button>
            </DialogActions>
        </Dialog>
    )
} 