import {
  selectMyPoll,
  selectTotalOptions,
  selectAllOptions,
  selectSummationOfVotes
} from './my-poll.selectors';
import { mockFilledPollState, mockEmptyPollState } from '../shared/test/store-service-stup';
import { MyPollState } from '../interfaces/my-poll-state';
import { initialState, myPollReducer } from './my-poll.reducer';
import { resetPoll } from './my-poll.actions';

describe('MyPollSelector', () => {
  it('selects the current state of my poll', () => {
    expect(selectMyPoll.projector(mockEmptyPollState)).toEqual(mockEmptyPollState);
  });

  it('selects the current state of my poll', () => {
    expect(selectAllOptions.projector(mockEmptyPollState)).toEqual(mockEmptyPollState.poll[0].options);
  });

  it('selects the current state of my poll', () => {
    expect(selectTotalOptions.projector(mockEmptyPollState)).toEqual(2);
  });

  it('selects the current state of my poll', () => {
    expect(selectSummationOfVotes.projector(mockFilledPollState)).toEqual(6);
  });
});