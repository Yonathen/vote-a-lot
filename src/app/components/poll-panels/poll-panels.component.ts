import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { resetPoll } from 'src/app/state/my-poll.actions';

@Component({
  selector: 'app-poll-panels',
  templateUrl: './poll-panels.component.html',
  styleUrls: ['./poll-panels.component.scss']
})
export class PollPanelsComponent implements OnInit {

  public loaded: boolean = false;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.reset();
  }

  reset() {
    this.loaded = false;
    this.store.dispatch(resetPoll());
  }

}
