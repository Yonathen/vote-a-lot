import { createAction, props } from "@ngrx/store";
import { MyPoll } from "../interfaces/my-poll";
import { Option } from "../interfaces/option";

import { Actions } from "../enums/actions";
import { Action } from "rxjs/internal/scheduler/Action";

export const updatePoll = createAction(
  Actions.UpdatePoll, 
  props<{question: string }>()
);

export const  addOption = createAction(
  Actions.AddOption, 
  props<{ option: Option }>()
);

export const updateOption = createAction(
  Actions.UpdateOption, 
  props<{ uuid: string, label: string }>()
);

export const removeOption = createAction(
  Actions.RemoveOption, 
  props<{ uuid: string }>()
);

export const voteForOption = createAction(
  Actions.VoteForOption, 
  props<{ uuid: string }>()
);

export const resetPoll = createAction(
  Actions.ResetPoll
);

