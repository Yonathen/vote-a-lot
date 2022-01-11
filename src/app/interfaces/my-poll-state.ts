import { MyPoll } from "./my-poll";

export interface MyPollState {
  poll: MyPoll[],
  loaded?: boolean
}
