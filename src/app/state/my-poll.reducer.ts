import { createReducer, on } from '@ngrx/store';
import { MyPollState } from '../interfaces/my-poll-state';
import { updateOption, updatePoll, voteForOption, removeOption, addOption, resetPoll } from './my-poll.actions';
import { v4 as uuidv4 } from 'uuid';
import * as _ from 'lodash';

export const initialState: MyPollState = {
  poll: [],
  loaded: false
};

export const myPollReducer = createReducer(
  initialState,
  on(updatePoll, (state, { question }) => {
    const stateCloned = _.cloneDeep(state);
    stateCloned.poll[0].question = question;

    return stateCloned;
  }),
  on(updateOption, (state, { uuid, label }) => {
    const stateCloned = _.cloneDeep(state);
    const selectedOption = stateCloned.poll[0].options.find(option => option.uuid === uuid);
    if(selectedOption) {
      selectedOption.label = label;
    }
    return stateCloned;
  }),
  on(voteForOption, (state, { uuid }) => {
    const stateCloned = _.cloneDeep(state);
    const selectedOption = stateCloned.poll[0].options?.find(option => option.uuid === uuid);
    if(selectedOption) {
      selectedOption.vote++;
    }
    return stateCloned;
  }),
  on(removeOption, (state, { uuid }) => {
    const stateCloned = _.cloneDeep(state);
    const filteredOptions = stateCloned.poll[0].options?.filter(option => option.uuid !== uuid);
    stateCloned.poll[0].options = filteredOptions;
    return stateCloned;
  }),
  on(addOption, (state, { option }) => {
    const stateCloned = _.cloneDeep(state);
    stateCloned.poll[0].options?.push(option);
    return stateCloned;
  }),
  on(resetPoll, (state) => {
    state = {
      poll: [
        {
          uuid: uuidv4(),
          question: '',
          options: [
            {uuid: uuidv4(), label: '', vote: 0},
            {uuid: uuidv4(), label: '', vote: 0}
          ]
        }
      ],
      loaded: true
    }
    return state;
  })
);