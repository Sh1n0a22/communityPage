import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import type { Post } from "../../data/mockData";
import { useRef } from "react";


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


  const addPost = () => {
   
  if (postTitle.current && postContent.current) {
    const postTemplate: Post = {
      id: Date.now(),
      img: postImgUrl.current?.value || "", // empty string if no image
      title: postTitle.current.value,
      content: postContent.current.value,
      author: "User",
      comments: [],
      createdAt: Date.now().toString()
    }
    updatePostData([...PostData, postTemplate])
  }
  CloseModal()
  return
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
            onClick={addPost}
            variant="contained"
            color="primary"
          >
            Add Post
          </Button>
        </DialogActions>
      </Dialog>
    )
  } 