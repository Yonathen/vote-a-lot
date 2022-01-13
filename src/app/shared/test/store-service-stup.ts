import { of } from "rxjs";
import { v4 as uuidv4 } from 'uuid';

export const mockEmptyPollState = {
  poll: [
    {
      uuid: 'unique_id',
      question: '',
      options: [
        {uuid: 'unique_id', label: '', vote: 0},
        {uuid: 'unique_id', label: '', vote: 0}
      ]
    }
  ],
  loaded: true
};


export const mockFilledPollState = {
  poll: [
    {
      uuid: 'unique_id',
      question: 'What is the value of pi?',
      options: [
        {uuid: 'unique_id_0', label: '3.14', vote: 4},
        {uuid: 'unique_id_1', label: '3.1415', vote: 2}
      ]
    }
  ],
  loaded: true
};

export const storeServiceStub = (empty: boolean = true) => {
  let mockPollState = mockEmptyPollState;
  if (!empty) {
    mockPollState = mockFilledPollState;
  }

  return {
    select(selector: any) {
      return of( mockPollState );
    },
    dispatch(action: any) { }
  }
};