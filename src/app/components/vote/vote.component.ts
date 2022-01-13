import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MyPoll } from '../../interfaces/my-poll';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {

  @Input() myPoll: MyPoll | undefined;
  @Output() selectOptionEmitter: EventEmitter<string> 
    = new EventEmitter<string>();

  constructor() { }

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

  selectOption(event: any) {
    this.selectOptionEmitter.emit(event.target.value);
  }

}
