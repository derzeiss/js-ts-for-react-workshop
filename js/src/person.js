export const person = ({ name, bio, posts }) => {
  return `<h2>${name}</h2>
  <p>${bio}</p>
  <ul>
    ${posts.map((post) => `<li>${post.title}</li>`).join("\n")}
  </ul>
  `;
};
