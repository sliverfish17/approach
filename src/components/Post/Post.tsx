import { memo, useState } from "react";
import { IPost } from "@/types/Post";
import { PostDetailsModal } from "@/components/Post/PostDetailsModal";
import { EditPostModal } from "@/components/Post/EditPostModal";
import { DeletePostModal } from "@/components/Post/DeletePostModal";
import { Button } from "../UI/Button";

export const Post = memo(({ post, page }: { post: IPost; page: number }) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <div className="border p-4 mb-4 rounded shadow">
      <h2 className="text-xl font-bold">{post.title}</h2>
      <p>{post.body}</p>
      <div className="flex gap-2 justify-end mt-4">
        <Button onClick={() => setIsDetailsOpen(true)}>Details</Button>
        <Button onClick={() => setIsEditOpen(true)} color="green">
          Edit
        </Button>
        <Button onClick={() => setIsDeleteOpen(true)} color="red">
          Delete
        </Button>
      </div>

      <PostDetailsModal
        post={post}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />
      <EditPostModal
        post={post}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        page={page}
      />
      <DeletePostModal
        postId={post.id}
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        page={page}
      />
    </div>
  );
});
