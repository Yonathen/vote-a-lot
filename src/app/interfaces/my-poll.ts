import { Option } from "./option";

export interface MyPoll {
  uuid: string;
  question: string;
  options: Array<Option>;
}
