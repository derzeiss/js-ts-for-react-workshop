import "./style.css";

import personListModule from "./personList";

/** TASK 1 (functions)
 * 1. Copy the sample data (const JOHN = ...)
 * 2. Create a function `person` that takes a person and displays its name inside an h2 tag, like so: <h2>{name}</h2>.
 * 3. Copy the sample render function
 * 4. Render John using the person function. Notice that render takes a function as the second argument.
 */
const JOHN = { name: "John Doe", bio: "Tech-Writer from LA, loves React" };

const render = (selector, component) => {
  document.querySelector(selector).innerHTML = component();
};

const person = (person) => {
  return "<h2>" + person.name + "</h2>";
};

render("#app", () => person(JOHN));

/** TASK 2 (template literals)
 * Display not only the name, but also add the persons bio inside a p tag, like so: <p>{bio}</p>. Use a template literal.
 */
const personTemplateLiteral = (person) => {
  return `<h2>${person.name}</h2>
  <p>${person.bio}</p>
  `;
};
render("#app", () => personTemplateLiteral(JOHN));

/** TASK 3 (map)
 * 1. Copy the sample person data (const PERSONS = ...)
 * 2. Write a function `personList` that renders all persons in the list. Make sure there is no "," between them.
 */
const PERSONS = [
  { name: "John Doe", bio: "Tech-Writer from LA, loves React" },
  { name: "Jane Dae", bio: "Living on the road in my minivan writing code" },
];

const personList = (persons) => {
  return persons.map((p) => personTemplateLiteral(p)).join("\n");
};
render("#app", () => personList(PERSONS));

/** TASK 4 (DESTRUCTURING)
 * Use destructuring for your person argument, so that you can use <h2>${name}</h2> in the return.
 */
const personDestructuring = ({ name, bio }) => {
  return `<h2>${name}</h2>
  <p>${bio}</p>
  `;
};

/** TASK 5 (Spread-Op + map + filter)
 * 1. Copy the sample post data (const POSTS = ...)
 * 2. Create a new array `PERSONS_WITH_POSTS` which contains a person plus their own posts (matched by name).
 * 3. Extend the person function to show a persons posts inside a list, like so: <ul><li>{title}</li><li>{title}</li></ul>.
 */
const POSTS = [
  { title: "React is awesome", author: "John Doe" },
  { title: "Why you need to learn JS now", author: "Jane Dae" },
  { title: "React 19 is here!", author: "John Doe" },
];

const PERSONS_WITH_POSTS = PERSONS.map((person) => ({
  ...person,
  posts: POSTS.filter((post) => post.author === person.name),
}));

const personWithPosts = ({ name, bio, posts }) => {
  return `<h2>${name}</h2>
  <p>${bio}</p>
  <ul>
    ${posts.map((post) => `<li>${post.title}</li>`).join("\n")}
  </ul>
  `;
};

/** TASK 6 (Modules)
 * 1. Move the person & personList functions in their own files. Use a named export for person and a default export for personList.
 * 2. Import both components as personModule & personListModule (where you need them) and render the list of persons
 */
render("#app", () => personListModule(PERSONS_WITH_POSTS));

/** TASK 7 (Promises)
 * 1. All functions created in this task should return a Promise.
 * 2. Create a function `getPersonByName` that receives a name and returns
 *    a promise that gets resolved after one second with the corresponding person
 *    or rejected with an appropriate error message.
 * 3. Create a function `getPostsFor` that receives a person object and returns
 *    a promise that gets resolved after one second with the corresponding posts
 *    or rejected with an appropriate error message.
 * 4. Create a function `getPostTitlesByName` that receives a name and returns
 *    a promise that gets resolved with the corresponding post titles
 *    or rejected with an appropriate error message.
 * 5. Use this function to log johns post titles to the console.
 *    The result should be ['React is awesome', 'React 19 is here!'] (after 2s)
 * 6. Change the name you pass to `getPostTitlesByName` or rename POSTS.author
 *    to check what happens, when no user or no posts are found.
 */
const getPersonByName = (name) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const person = PERSONS.find((p) => p.name === name);
      if (person) return res(person);
      rej("Person not found: " + name);
    }, 1000);
  });
};

const getPostsFor = (person) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const posts = POSTS.filter((p) => p.author === person.name);
      if (posts.length) return res(posts);
      rej("No posts found for " + person.name);
    }, 1000);
  });
};

const getPostTitlesByName = (name) => {
  // Trainer-Hint: If getPostsFor accepts name:string we can also use Promise.all.
  return getPersonByName(name)
    .then((person) => getPostsFor(person))
    .then((posts) => posts.map((p) => p.title))
    .catch(console.error);
};

getPostTitlesByName("John Doe").then(console.log);
