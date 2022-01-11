import { of } from "rxjs";
import { v4 as uuidv4 } from 'uuid';

const mockEmptyPollState = {
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
};
export const storeServiceStub = {
  select(selector: any) {
    return of( mockEmptyPollState );
  },
  dispatch(action: any) {
    return mockEmptyPollState;
  }
};