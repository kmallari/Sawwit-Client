export interface Comment {
  id: string;
  userId: string;
  username: string;
  postId: string;
  parentId: string;
  body: string;
  createdAt: number;
  level: number;
  upvotes: number;
  downvotes: number;
  childrenCount: number;
}