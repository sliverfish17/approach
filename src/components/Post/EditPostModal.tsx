import { useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { Modal } from "@/components/UI/Modal";
import { IPost } from "@/types/Post";
import { updatePost } from "@/services/postsApi";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { Button } from "../UI/Button";

interface EditPostModalProps {
  post: IPost;
  isOpen: boolean;
  page: number;
  onClose: () => void;
}

export const EditPostModal = ({
  post,
  isOpen,
  page,
  onClose,
}: EditPostModalProps) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: post.title,
      body: post.body,
    },
  });

  const editMutation = useMutation(
    (data: { title: string; body: string }) => updatePost(post.id, data),
    {
      onSuccess: (updatedPost) => {
        queryClient.setQueryData(
          ["posts", page],
          (oldPosts?: { data: IPost[]; total: number }) => {
            if (!oldPosts) {
              return { data: [], total: 0 };
            }
            const updatedPosts = oldPosts.data.map((p: IPost) =>
              p.id === updatedPost.id ? updatedPost : p
            );
            return {
              data: updatedPosts,
              total: oldPosts.total,
            };
          }
        );
        toast.success("Post was successfully updated");
        onClose();
      },
      onError: (err: AxiosError) => {
        onClose();
        if (err.message) {
          toast.error(err.message);
        } else toast.error("Something went wrong");
      },
    }
  );

  const onSubmit = (data: { title: string; body: string }) => {
    editMutation.mutate(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Post">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("title")}
          placeholder="Title"
          className="border p-2 mb-2 w-full"
        />
        <textarea
          {...register("body")}
          placeholder="Body"
          className="border p-2 min-h-32 mb-2 w-full"
        ></textarea>
        <Button className="w-full" type="submit">
          Save Changes
        </Button>
      </form>
    </Modal>
  );
};
