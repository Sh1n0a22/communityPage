import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import type { Post, Comment } from "../../data/mockData";
import { useRef } from "react";

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

  const addReply = () => {
    if (!postId || !commentId || !replyContent.current?.value) return;

    const newReply: Comment = {
      id: Date.now(),
      author: "User" + Date.now(),
      text: replyContent.current.value,
      createdAt: new Date().toISOString(),
      replies: [],
    };

    // recursiveAddReply like we have post then it search for comments if comment exist it checks whether it has reply than it checks id if id didnt match and reply array for this array isnt empty it goes depper into array by calling recursiveAddReply again with new params else it just returns reply

    const recursiveAddReply = (replies: Comment[] | undefined, targetId: number): Comment[] => {
      if (!replies) return [];
      return replies.map(reply => {
        if (reply.id === targetId) {
          return {
            ...reply,
            replies: [...(reply.replies ?? []), newReply],
          };
        }
        if (reply.replies?.length) {
          return {
            ...reply,
            replies: recursiveAddReply(reply.replies, targetId),
          };
        }
        return reply;
      });
    };
    // so addReply just check if innerReplyId exist it start finding procces with recursiveAddReply
    // else it means that it its outer comment and than it just adds reply for this comment
    updatePostData(prevData =>
      prevData.map(post => {
        if (post.id !== postId) return post;

        return {
          ...post,
          comments: post.comments.map(comment => {
            if (comment.id !== commentId) return comment;

            if (innerReplyId) {

              return {
                ...comment,
                replies: recursiveAddReply(comment.replies, innerReplyId),
              };
            } else {

              return {
                ...comment,
                replies: [...(comment.replies ?? []), newReply],
              };
            }
          }),
        };
      })
    );

    replyContent.current.value = "";
    CloseModal();
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
        <Button onClick={addReply} variant="contained" color="primary">
          Add comment
        </Button>
      </DialogActions>
    </Dialog>
  );
}
