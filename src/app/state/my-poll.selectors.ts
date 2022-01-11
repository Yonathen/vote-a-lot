import { createSelector, createFeatureSelector } from '@ngrx/store';
import { MyPoll } from '../interfaces/my-poll';
import { MyPollState } from '../interfaces/my-poll-state';

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