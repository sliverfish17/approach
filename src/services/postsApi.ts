import { API_URL } from "@/types/Api";
import axios from "axios";

export const fetchPosts = async (page = 1, limit = 10) => {
  const response = await axios.get(API_URL.POSTS, {
    params: {
      _page: page,
      _limit: limit,
    },
  });
  return {
    data: response.data,
    total: parseInt(response.headers["x-total-count"], 10),
  };
};

export const createPost = async (post: {
  title: string;
  body: string;
  userId: number;
}) => {
  const response = await axios.post(API_URL.POSTS, post);
  return response.data;
};

export const updatePost = async (
  postId: number,
  post: { title: string; body: string }
) => {
  const response = await axios.put(`${API_URL.POSTS}/${postId}`, post);
  return response.data;
};

export const deletePost = async (postId: number) => {
  const response = await axios.delete(`${API_URL.POSTS}/${postId}`);
  return response.data;
};

export const fetchComments = async (postId: number) => {
  const response = await axios.get(`${API_URL.POSTS}/${postId}/comments`);
  return response.data;
};
