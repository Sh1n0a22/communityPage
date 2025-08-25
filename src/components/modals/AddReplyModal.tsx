import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useRef } from "react";
import { addReply } from "../../actions/postActions";
import type { Post } from "../../types/StoreTypes";

interface AddReplyModalProps {
  updatePostData: React.Dispatch<React.SetStateAction<Post[]>>;
  isOpened: boolean;
  CloseModal: () => void;
  commentId: number | null;
  postId: number | null;
  innerReplyId: number | null;
}

export default function AddReplyModal({
  updatePostData,
  CloseModal,
  isOpened,
  commentId,
  postId,
  innerReplyId,
}: AddReplyModalProps) {
  const replyContent = useRef<HTMLInputElement>(null);

  const handleReplyAdding = () => {
    addReply({ commentId, innerReplyId, postId, replyContent, updatePostData });
    CloseModal();
  };

  return (
    <Dialog
      open={isOpened}
      onClose={CloseModal}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          backgroundColor: "#1f1f1f",
          color: "#fff",
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: "bold", color: "#fff" }}>
        Reply to this comment
      </DialogTitle>

      <DialogContent
        dividers
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TextField
          required
          inputRef={replyContent}
          label="Content"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          sx={{
            "& label": { color: "#aaa" },
            "& label.Mui-focused": { color: "#90caf9" },
            "& .MuiInputBase-input": { color: "#fff" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#555" },
              "&:hover fieldset": { borderColor: "#888" },
              "&.Mui-focused fieldset": { borderColor: "#90caf9" },
            },
          }}
        />
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={CloseModal}
          variant="outlined"
          sx={{ color: "#fff", borderColor: "#555", "&:hover": { borderColor: "#888" } }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleReplyAdding}
          variant="contained"
          sx={{
            backgroundColor: "#1976d2",
            "&:hover": { backgroundColor: "#1565c0" },
            color: "#fff",
          }}
        >
          Add comment
        </Button>
      </DialogActions>
    </Dialog>
  );
}
