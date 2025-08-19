import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import type { Post } from "../../data/mockData";
import { useRef } from "react";
import { addPost } from "./modalUtils/postUtils";


interface AddPostModalProps {
  CloseModal: () => void
  isOpened: boolean,
  PostData: Post[],
  updatePostData: (dataToUpd: Post[]) => void
}

export default function AddPostModal({ updatePostData, CloseModal, isOpened, PostData }: AddPostModalProps) {
  const postTitle = useRef<HTMLInputElement>(null)
  const postContent = useRef<HTMLInputElement>(null)
  const postImgUrl = useRef<HTMLInputElement>(null)


  const handlePostAdding = () => {
  addPost({postContent,PostData,postImgUrl,postTitle,updatePostData})
  return CloseModal()
}
    return (
      <Dialog
        open={isOpened}
        onClose={CloseModal}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ fontWeight: "bold" }}>Add Post</DialogTitle>

        <DialogContent dividers sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            required
            inputRef={postTitle}
            label="Heading"
            variant="outlined"
            fullWidth
          />

          <TextField
            inputRef={postImgUrl}
            label="Image Url"
            variant="outlined"
            fullWidth
          />
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
            onClick={handlePostAdding}
            variant="contained"
            color="primary"
          >
            Add Post
          </Button>
        </DialogActions>
      </Dialog>
    )
  } 