import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { MyPoll } from 'src/app/interfaces/my-poll';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {

  @Input() myPoll: MyPoll | undefined;
  @Input() resetVote: boolean = true;
  @Output() selectOptionEmitter: EventEmitter<string> 
    = new EventEmitter<string>();
  
  myLocalPoll: MyPoll | undefined;

  constructor() { }

  ngOnInit(): void {
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes && this.myPoll && this.resetVote) {
      this.myLocalPoll = this.myPoll;
    }
  }

  get isQuestionValid() {
    const { question } = this.myLocalPoll || {};

    if (!question) {
      return false;
    } 

    return true;
  }

  get isOptionValid() {
    const { options = [] } = this.myLocalPoll || {};

    for( const option of options) {
      if(!option.label) {
        return false;
      }
    }

    return true;
  }

  get pollDetail() {
    const { question, options = {} } = this.myLocalPoll || {};
    return {question, options};
  }

  selectOption(event: any) {
    this.selectOptionEmitter.emit(event.target.value);
  }

}
