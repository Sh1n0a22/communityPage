import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import type { Post } from "../../data/mockData";
import { useRef } from "react";
import { addReply } from "./modalUtils/postUtils";

interface AddReplyModalProps {
  updatePostData: React.Dispatch<React.SetStateAction<Post[]>>,
  isOpened: boolean,
  CloseModal: () => void,
  commentId: number | null,
  postId: number | null,
  innerReplyId: number | null,
}

export default function AddReplyModal({ updatePostData, CloseModal, isOpened, commentId, postId, innerReplyId }: AddReplyModalProps) {
  const replyContent = useRef<HTMLInputElement>(null);

  const handleReplyAdding = () => {
    addReply({commentId,innerReplyId,postId,replyContent,updatePostData})
    return CloseModal();
  };

  return (
    <Dialog open={isOpened} onClose={CloseModal} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: "bold" }}>Reply to this comment</DialogTitle>

      <DialogContent dividers sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          required
          inputRef={replyContent}
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
        <Button onClick={handleReplyAdding} variant="contained" color="primary">
          Add comment
        </Button>
      </DialogActions>
    </Dialog>
  );
}
