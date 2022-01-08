import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {CardModule} from 'primeng/card';
import { ButtonModule } from 'primeng/button';

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
    CardModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
