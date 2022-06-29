export interface Post {
  ID: string;
  userId: string;
  username: string;
  title: string;
  body: string;
  subredditId: string;
  subreddit: string;
  createdAt: number;
}
