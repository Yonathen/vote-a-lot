import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ControlType } from 'src/app/enums/control-type';
import { MyPoll } from 'src/app/interfaces/my-poll';
import { MyPollState } from 'src/app/interfaces/my-poll-state';
import { selectMyPoll } from 'src/app/state/my-poll.selectors';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {

  @Input() myPoll: MyPoll | undefined;

  constructor(public fb: FormBuilder) { }

  ngOnInit(): void {
  }

  get isQuestionValid() {
    const { question } = this.myPoll || {};

    if (!question) {
      return false;
    } 

    return true;
  }

  get isOptionValid() {
    const { options = [] } = this.myPoll || {};

    for( const option of options) {
      if(!option.label) {
        return false;
      }
    }

    return true;
  }

  get pollDetail() {
    const { question, options = {} } = this.myPoll || {};
    return {question, options};
  }

  selectOption(index: number) {
    
  }

}
