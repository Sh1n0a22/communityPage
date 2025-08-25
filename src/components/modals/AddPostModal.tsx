import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

import { useRef } from "react";
import { addPost } from "../../actions/postActions";
import type { Post } from "../../types/StoreTypes";

interface AddPostModalProps {
  CloseModal: () => void;
  isOpened: boolean;
  PostData: Post[];
  updatePostData: (dataToUpd: Post[]) => void;
}

export default function AddPostModal({ updatePostData, CloseModal, isOpened, PostData }: AddPostModalProps) {
  const postTitle = useRef<HTMLInputElement>(null);
  const postContent = useRef<HTMLInputElement>(null);
  const postImgUrl = useRef<HTMLInputElement>(null);

  const handlePostAdding = () => {
    addPost({ postContent, PostData, postImgUrl, postTitle, updatePostData });
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
      <DialogTitle sx={{ fontWeight: "bold", color: "#fff" }}>Add Post</DialogTitle>

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
          inputRef={postTitle}
          label="Heading"
          variant="outlined"
          fullWidth
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

        <TextField
          inputRef={postImgUrl}
          label="Image Url"
          variant="outlined"
          fullWidth
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

        <TextField
          required
          inputRef={postContent}
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
          type="submit"
          onClick={handlePostAdding}
          variant="contained"
          sx={{
            backgroundColor: "#1976d2",
            "&:hover": { backgroundColor: "#1565c0" },
            color: "#fff",
          }}
        >
          Add Post
        </Button>
      </DialogActions>
    </Dialog>
  );
}
