import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { createPost } from "@/services/postsApi";
import { IPost } from "@/types/Post";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

interface CreatePostFormInputs {
  title: string;
  body: string;
}

export const CreatePostForm = ({ page }: { page: number }) => {
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm<CreatePostFormInputs>();

  const createMutation = useMutation(createPost, {
    onSuccess: (newPost: IPost) => {
      queryClient.setQueryData(
        ["posts", page],
        (oldPosts?: { data: IPost[]; total: number }) => {
          if (!oldPosts) {
            return { data: [newPost], total: 1 };
          }
          return {
            data: [newPost, ...oldPosts.data],
            total: oldPosts.total ? oldPosts.total + 1 : 1,
          };
        }
      );
      toast.success("Post was successfully created");
      reset();
    },
    onError: (err: AxiosError) => {
      if (err.message) {
        toast.error(err.message);
      } else toast.error("Something went wrong");
    },
  });

  const onSubmit = (data: CreatePostFormInputs) => {
    createMutation.mutate({ ...data, userId: Date.now() });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="border p-4 rounded mb-4">
      <input
        type="text"
        {...register("title", { required: true })}
        placeholder="Title"
        className="border p-2 mb-2 w-full"
      />
      <textarea
        {...register("body", { required: true })}
        placeholder="Body"
        className="border p-2 mb-2 w-full"
      ></textarea>
      <button type="submit" className="bg-green-500 text-white p-2 w-full">
        {createMutation.isLoading ? "Creating..." : "Create Post"}
      </button>
    </form>
  );
};
