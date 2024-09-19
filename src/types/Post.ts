export interface IPost {
  body: string;
  id: number;
  title: string;
  userId: number;
}

export interface IComment {
  body: string;
  email: string;
  id: number;
  name: string;
  postId: number;
}
