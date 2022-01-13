import {
  updateOption,
  updatePoll,
  voteForOption,
  removeOption, 
  addOption, 
  resetPoll 
} from './my-poll.actions';
import { initialState, myPollReducer } from './my-poll.reducer';
import { mockFilledPollState, mockEmptyPollState } from '../shared/test/store-service-stup';
import * as uuidWrapper from 'uuid';
import { MyPollState } from '../interfaces/my-poll-state';
import * as _ from 'lodash';
import { Option } from '../interfaces/option';


describe('MyPollReducer', () => {
  let state: MyPollState;

  beforeEach(() => {
    jest.spyOn(uuidWrapper, 'v4').mockReturnValue('unique_id');
  });

  it('resets the state', () => {
    state = myPollReducer(initialState, resetPoll);
    expect(state).toEqual(mockEmptyPollState);
  });

  it('updates the state question', () => {
    state = myPollReducer(mockEmptyPollState, updatePoll({ question: 'sample_question'}));
    expect(state.poll[0].question).toEqual('sample_question');
  });

  it('updates the state option', () => {
    mockEmptyPollState.poll[0].options.forEach((option, index) => {
      jest.spyOn(uuidWrapper, 'v4').mockReturnValue(`unique_id_${index}`);
      state = myPollReducer(mockFilledPollState, updateOption({
        label: `sample_question${index}`,
        uuid: `unique_id_${index}`
      }));
      expect(state.poll[0].options[index].label).toEqual(`sample_question${index}`);
    });
  });

  it('adds the state option', () => {
    jest.spyOn(uuidWrapper, 'v4').mockReturnValue(`unique_id_3`);
    const option: Option = { label: `sample_question3`, uuid: `unique_id_3`, vote: 0};
    state = myPollReducer(mockFilledPollState, addOption({ option }));
    expect(state.poll[0].options[2].label).toEqual(`sample_question3`);
    expect(state.poll[0].options[2].uuid).toEqual(`unique_id_3`);
    expect(state.poll[0].options[2].vote).toEqual(0);
  });

  it('removes the state option', () => {
    state = myPollReducer(mockFilledPollState, removeOption({uuid: 'unique_id_1'}));
    expect(state.poll[0].options.length).toEqual(1);
    expect(state.poll[0].options[0].uuid).toEqual(`unique_id_0`);
  });

  it('adds the state option', () => {
    state = myPollReducer(mockFilledPollState, voteForOption({ uuid: `unique_id_1` }));
    expect(state.poll[0].options[1].vote).toEqual(3);
  });
});