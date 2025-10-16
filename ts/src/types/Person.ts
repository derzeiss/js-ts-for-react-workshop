import type { Post } from "./Post";

export interface Person {
  name: string;
  bio: string;
}

export interface PersonWithPosts extends Person {
  posts: Post[];
}
