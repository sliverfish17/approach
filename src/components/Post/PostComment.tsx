import { IComment } from "@/types/Post";

export const PostComment = (comment: IComment) => {
  return (
    <li key={comment.id} className="mb-2">
      <strong>
        {comment.name}:<br />
      </strong>
      {comment.body}
    </li>
  );
};
