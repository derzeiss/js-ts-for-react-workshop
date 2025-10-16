export const person = ({ name, bio, posts }) => {
  return `<h2>${name}</h2>
  <p>${bio}</p>
  <ul>
    ${posts.map((post) => `<li>${post.name}</li>`).join("\n")}
  </ul>
  `;
};
