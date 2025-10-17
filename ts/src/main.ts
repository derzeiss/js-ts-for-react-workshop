import personListModule from "./personList";
import "./style.css";
import type { Component } from "./types/Component";
import type { Person } from "./types/Person";
import type { Post } from "./types/Post";

/** TASK 1 (Interfaces, extend (PersonWithProps), function typing (render))
 * 1. Inside a new `src/types/` directory, create interface types for Person, Post.
 * 2. Create an interface for PersonWithPosts. Try to avoid any unneeded repetition.
 * 3. Copy all .js files over here, change the file extension to .ts and resolve the type errors.
 */

/**
 * TASK 2 (Generics)
 * Create a new generic interface Component that takes a type parameter that only
 * allows an object and defaults to `{}`. Use this interface to type person and personList.
 */

const render = (selector: string, component: Component) => {
  document.querySelector(selector)!.innerHTML = component({});
};

const PERSONS: Person[] = [
  { name: "John Doe", bio: "Tech-Writer from LA, loves React" },
  { name: "Jane Dae", bio: "Living on the road in my minivan writing code" },
];

const POSTS: Post[] = [
  { title: "React is awesome", author: "John Doe" },
  { title: "Why you need to learn JS now", author: "Jane Dae" },
  { title: "React 19 is here!", author: "John Doe" },
];

/** Trainer-Hint: TS is shape-based -> Even without explicit type annotation
 * I can throw this into personList bc it LOOKS like a PersonWithPosts[] type.
 */
const PERSONS_WITH_POSTS = PERSONS.map((person) => ({
  ...person,
  posts: POSTS.filter((post) => post.author === person.name),
}));

render("#app", () => personListModule(PERSONS_WITH_POSTS));

const getPersonByName = (name: string): Promise<Person> => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const person = PERSONS.find((p) => p.name === name);
      if (person) return res(person);
      rej("Person not found: " + name);
    }, 1000);
  });
};

const getPostsFor = (person: Person): Promise<Post[]> => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const posts = POSTS.filter((p) => p.author === person.name);
      if (posts.length) return res(posts);
      rej("No posts found for " + person.name);
    }, 1000);
  });
};

const getPostTitlesByName = (name: string) => {
  return getPersonByName(name)
    .then((person) => getPostsFor(person))
    .then((posts) => posts.map((p) => p.title))
    .catch(console.error);
};

getPostTitlesByName("John Doe").then(console.log);
