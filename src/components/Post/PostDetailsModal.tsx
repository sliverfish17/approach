import { useQuery } from "react-query";
import { fetchComments } from "@/services/postsApi";
import { Modal } from "@/components/UI/Modal";
import { IComment, IPost } from "@/types/Post";
import { Loader } from "@/components/UI/Loader";
import { PostComment } from "./PostComment";

interface PostDetailsModalProps {
  post: IPost;
  isOpen: boolean;
  onClose: () => void;
}

export const PostDetailsModal = ({
  post,
  isOpen,
  onClose,
}: PostDetailsModalProps) => {
  const { data: comments, isLoading } = useQuery(
    ["comments", post.id],
    () => fetchComments(post.id),
    {
      enabled: isOpen,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000,
      cacheTime: 5 * 60 * 1000,
    }
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={post.title}>
      <p>{post.body}</p>
      <h3 className="text-lg font-semibold mt-4">Comments:</h3>
      {isLoading ? (
        <Loader />
      ) : (
        <ul>
          {comments?.map((comment: IComment) => (
            <PostComment key={comment.id} {...comment} />
          ))}
        </ul>
      )}
      {!isLoading && !comments?.lenght && <p>There is no comments yet!</p>}
    </Modal>
  );
};
