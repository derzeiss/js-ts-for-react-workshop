import { person as personModule } from "./person";

const personList = (persons) => {
  return persons.map((p) => personModule(p)).join("\n");
};

export default personList;
