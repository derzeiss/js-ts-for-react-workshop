import type { Component } from "./types/Component";
import type { PersonWithPosts } from "./types/Person";

export const person: Component<PersonWithPosts> = ({ name, bio, posts }) => {
  return `<h2>${name}</h2>
  <p>${bio}</p>
  <ul>
    ${posts.map((post) => `<li>${post.name}</li>`).join("\n")}
  </ul>
  `;
};
