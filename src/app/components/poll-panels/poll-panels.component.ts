import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MyPollState } from 'src/app/interfaces/my-poll-state';
import { resetPoll } from 'src/app/state/my-poll.actions';
import { selectMyPoll, selectTotalOptions } from 'src/app/state/my-poll.selectors';

@Component({
  selector: 'app-poll-panels',
  templateUrl: './poll-panels.component.html',
  styleUrls: ['./poll-panels.component.scss']
})
export class PollPanelsComponent implements OnInit {

  public numberOfOptions$: Observable<number> = this.store.select(selectTotalOptions);
  public numberOfOptions: number = 0;
  
  public loaded: boolean = false;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.reset();
    this.numberOfOptions$.subscribe(value => this.numberOfOptions = value);
  }

  reset() {
    this.loaded = false;
    this.store.dispatch(resetPoll());
  }

}
