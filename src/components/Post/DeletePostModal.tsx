import { useMutation, useQueryClient } from "react-query";
import { Modal } from "@/components/UI/Modal";
import { deletePost } from "@/services/postsApi";
import { IPost } from "@/types/Post";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { Button } from "../UI/Button";

interface DeletePostModalProps {
  postId: number;
  isOpen: boolean;
  onClose: () => void;
  page: number;
}

export const DeletePostModal = ({
  postId,
  isOpen,
  page,
  onClose,
}: DeletePostModalProps) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(() => deletePost(postId), {
    onSuccess: () => {
      queryClient.setQueryData(
        ["posts", page],
        (oldPosts?: { data: IPost[]; total: number }) => {
          if (!oldPosts) {
            return { data: [], total: 0 };
          }
          const updatedPosts = oldPosts.data.filter(
            (post: IPost) => post.id !== postId
          );
          return {
            data: updatedPosts,
            total: oldPosts.total ? oldPosts.total - 1 : 0,
          };
        }
      );
      toast.success("Post was successfully deleted");
      onClose();
    },
    onError: (err: AxiosError) => {
      onClose();
      if (err.message) {
        toast.error(err.message);
      } else toast.error("Something went wrong");
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Delete">
      <p>Are you sure you want to delete this post?</p>
      <div className="flex justify-end gap-2 mt-4">
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleDelete} color="red">
          Delete
        </Button>
      </div>
    </Modal>
  );
};
