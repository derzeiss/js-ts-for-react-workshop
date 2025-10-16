import { person as personModule } from "./person";
import type { Component } from "./types/Component";
import type { PersonWithPosts } from "./types/Person";

const personList: Component<PersonWithPosts[]> = (persons) => {
  return persons.map((p) => personModule(p)).join("\n");
};

export default personList;
