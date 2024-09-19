import { fetchPosts } from "@/services/postsApi";
import { Loader } from "@/components/UI/Loader";
import { useQuery } from "react-query";
import { IPost } from "@/types/Post";
import { Post } from "@/components/Post/Post";
import { useState, useEffect } from "react";
import { PostPagination } from "@/components/Post/PostPagination";
import { CreatePostForm } from "@/components/Post/CreatePost";

const PAGE_SIZE = 20;

const Home = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery(
    ["posts", page],
    () => fetchPosts(page, PAGE_SIZE),
    {
      refetchInterval: 60000,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000,
      cacheTime: 5 * 60 * 1000,
    }
  );

  const { data: posts, total } = data || { data: [], total: 0 };
  const totalPages = total ? Math.ceil(total / PAGE_SIZE) : 1;

  useEffect(() => {
    if (posts.length === 0 && total > 0) {
      if (page > 1) {
        setPage((prev) => prev - 1);
      } else if (page < totalPages) {
        setPage((prev) => prev + 1);
      }
    }
  }, [posts, page, totalPages, total]);

  if (isLoading) return <Loader />;

  return (
    <div>
      <h1 className="text-2xl mb-4">Posts</h1>
      <CreatePostForm page={page} />
      {posts.length > 0 ? (
        <>
          {posts.map((post: IPost) => (
            <Post page={page} post={post} key={post.id} />
          ))}
          <PostPagination
            page={page}
            setPage={setPage}
            totalPages={totalPages}
          />
        </>
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};

export default Home;
