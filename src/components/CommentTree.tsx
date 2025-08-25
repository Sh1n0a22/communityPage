import { Button } from "@mui/material";
import type { CommentTreeProps } from "../types/ComentTreeTypes";

interface CommentTreeExtendedProps extends CommentTreeProps {
  level?: number;
  maxIndent?: number;
}

export default function CommentTree({
  comments,
  postId,
  expanded,
  toggleReplies,
  handleReplyAdding,
  parentAuthor,
  level = 0,
  maxIndent = 160,
}: CommentTreeExtendedProps) {
  const indent = Math.min(level * 20, maxIndent);

  return (
    <>
      {comments.map((comment) => (
        <div key={comment.id} className="relative mb-4 group">
          {/* Vertical dividing line for current branch */}
          {level > 0 && (
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-gray-700 transition-colors duration-200 group-hover:bg-[#1e40af]"
              style={{ left: `${indent - 20}px` }}
            />
          )}

          {/* Comment container */}
          <div
            className="bg-gray-900 p-3 rounded-xl shadow-md border border-gray-700 transition-colors duration-200"
            style={{
              marginLeft: `${indent}px`,
              fontSize: "14px",
              lineHeight: "1.5",
            }}
          >
            <p className="font-semibold text-white">{comment.author}</p>
            <p className="text-gray-300 mt-1">
              {parentAuthor && (
                <span className="text-blue-500 font-medium mr-1">
                  @{parentAuthor}
                </span>
              )}
              {comment.text}
            </p>

            <div className="flex flex-wrap items-center gap-2 mt-2">
              <Button
                size="small"
                variant="outlined"
                onClick={() => handleReplyAdding(postId, comment.id)}
                sx={{
                  color: "#fff",
                  borderColor: "#555",
                  fontSize: "0.875rem",
                  "&:hover": { borderColor: "#888" },
                }}
              >
                Reply
              </Button>

              {comment.replies && comment.replies.length > 0 && (
                <Button
                  size="small"
                  variant="text"
                  onClick={() => toggleReplies(comment.id)}
                  sx={{ color: "#aaa", fontSize: "0.875rem" }}
                >
                  {expanded[comment.id]
                    ? "Hide replies"
                    : `View replies (${comment.replies.length})`}
                </Button>
              )}
            </div>
          </div>

          {/* Replies */}
          {expanded[comment.id] && comment.replies && comment.replies.length > 0 && (
            <CommentTree
              comments={comment.replies}
              postId={postId}
              expanded={expanded}
              toggleReplies={toggleReplies}
              handleReplyAdding={(pid, cid, rid) =>
                handleReplyAdding(pid, comment.id, rid ?? cid)
              }
              parentAuthor={comment.author}
              level={level + 1}
              maxIndent={maxIndent}
            />
          )}
        </div>
      ))}
    </>
  );
}
