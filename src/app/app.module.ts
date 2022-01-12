import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import {InputTextModule} from 'primeng/inputtext';
import {CardModule} from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ChartModule} from 'primeng/chart';

import { myPollReducer } from './state/my-poll.reducer';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { PollPanelsComponent } from './components/poll-panels/poll-panels.component';
import { ChartComponent } from './components/chart/chart.component';
import { VoteComponent } from './components/vote/vote.component';
import { SetupComponent } from './components/setup/setup.component';


@NgModule({
  declarations: [
    AppComponent,
    PollPanelsComponent,
    ChartComponent,
    VoteComponent,
    SetupComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    CardModule,
    ChartModule,
    ButtonModule,
    InputTextModule,
    RadioButtonModule,
    StoreModule.forRoot({ poll: myPollReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
