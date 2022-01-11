import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MyPoll } from 'src/app/interfaces/my-poll';
import { MyPollState } from 'src/app/interfaces/my-poll-state';
import { selectMyPoll } from 'src/app/state/my-poll.selectors';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {

  public myPoll$: Observable<MyPollState> = this.store.select(selectMyPoll);
  public myPollState: MyPollState  = { poll: [] };

  constructor(
    public fb: FormBuilder,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.myPoll$.subscribe(myPollState => {
      if( myPollState && myPollState.poll[0] ) {
        this.myPollState = myPollState;
      }
    })
  }

  get isQuestionValid() {
    const { question } = this.myPollState.poll[0];

    if (!question) {
      return false;
    } 

    return true;
  }

  get isOptionValid() {
    const { options } = this.myPollState.poll[0];

    for( const option of options) {
      if(!option.label) {
        return false;
      }
    }

    return true;
  }

  get pollDetail() {
    const {question, options} = this.myPollState.poll[0];
    return {question, options};
  }

}
