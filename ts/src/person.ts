import type { Component } from "./types/Component";
import type { PersonWithPosts } from "./types/Person";

export const person: Component<PersonWithPosts> = ({ name, bio, posts }) => {
  return `<h2>${name}</h2>
  <p>${bio}</p>
  <ul>
    ${posts.map((post) => `<li>${post.title}</li>`).join("\n")}
  </ul>
  `;
};
