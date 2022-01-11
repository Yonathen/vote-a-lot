import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MyPollState } from 'src/app/interfaces/my-poll-state';
import { resetPoll, addOption, removeOption, updateOption, updatePoll } from 'src/app/state/my-poll.actions';
import { selectMyPoll, selectTotalOptions } from 'src/app/state/my-poll.selectors';

import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-poll-panels',
  templateUrl: './poll-panels.component.html',
  styleUrls: ['./poll-panels.component.scss']
})
export class PollPanelsComponent implements OnInit {

  public numberOfOptions$: Observable<number> = this.store.select(selectTotalOptions);
  public numberOfOptions: number = 0;
  public reset: boolean = true;


  public myPoll$: Observable<MyPollState> = this.store.select(selectMyPoll);
  public myPollState: MyPollState  = { poll: [] };

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.onReset();
    this.numberOfOptions$.subscribe(value => this.numberOfOptions = value);
    this.myPoll$.subscribe(myPollState => {
      if( myPollState && myPollState.poll[0] ) {
        this.myPollState = myPollState;

        setTimeout(() => {this.reset = false})
      }
    })
  }

  get myPoll() {
    return this.myPollState.poll[0]
  }

  onReset() {
    this.reset = true;
    this.store.dispatch(resetPoll());
  }

  updateQuestion(question: string) {
    this.store.dispatch(updatePoll({ question }));
  }

  removeOption(uuid: string) {
    this.store.dispatch(removeOption({ uuid }));
  }

  addOption(label: string) {
    this.store.dispatch(addOption({ option : { uuid: uuidv4(), label, vote: 0 }}));
  }

  updateOption(option: {uuid: string, label: string}) {
    const { uuid, label } = option;
    this.store.dispatch(updateOption({ uuid, label }));
  }

}
