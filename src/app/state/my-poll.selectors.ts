import { createSelector, createFeatureSelector } from '@ngrx/store';
import { MyPollState } from '../interfaces/my-poll-state';
import * as _ from 'lodash';

export const selectPoll = createFeatureSelector<MyPollState>('poll');

export const selectMyPoll = createSelector(
  selectPoll,
  state => state
);

export const selectTotalOptions = createSelector(
  selectPoll,
  state => state.poll[0].options.length
);

export const selectAllOptions = createSelector(
  selectPoll,
  state => state.poll[0].options
);

export const selectSummationOfVotes = createSelector(
  selectPoll,
  state => {
    let totalVote: number = 0;
    const stateCloned = _.cloneDeep(state);
    const { options = [] } = stateCloned.poll[0];
    for ( const option of options) {
      totalVote += option.vote;
    }

    return totalVote
  }
);