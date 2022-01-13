import { ComponentFixture, TestBed } from '@angular/core/testing';
import { mockEmptyPollState, mockFilledPollState, storeServiceStub } from '../../shared/test/store-service-stup';


import { VoteComponent } from './vote.component';
import { DebugElement } from '@angular/core';

describe('VoteComponent', () => {
  let component: VoteComponent;
  let fixture: ComponentFixture<VoteComponent>;

  let voteDebugElement: DebugElement;
  let votingFormEl: HTMLElement;
  let questionLabelEl: HTMLElement;
  let failedMessageEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoteComponent ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();

    voteDebugElement = fixture.debugElement;
    failedMessageEl = voteDebugElement.nativeElement.querySelector('#failed_message');
    votingFormEl = voteDebugElement.nativeElement.querySelector('#voting_form');
    questionLabelEl = voteDebugElement.nativeElement.querySelector('#question_label');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows failed message if poll is undefined', () => {
    component.myPoll = undefined;
    expect(failedMessageEl).toBeTruthy();
    expect(votingFormEl).toBeFalsy();
  });

  it('shows failed message if poll data is not valid', () => {
    component.myPoll = mockEmptyPollState.poll[0];
    expect(failedMessageEl).toBeTruthy();
    expect(votingFormEl).toBeFalsy();
  });

  it('shows failed message if poll data is not valid', () => {
    component.myPoll = mockFilledPollState.poll[0];
    expect(component.isOptionValid).toBeTruthy();
    expect(component.isQuestionValid).toBeTruthy();
    setTimeout(() => {
      expect(failedMessageEl).toBeFalsy();
      expect(votingFormEl).toBeTruthy();
      expect(questionLabelEl).toBeTruthy();
    })
  });

  it('emits selected option', () => {
    let selectedUuid: string;
    component.selectOptionEmitter.subscribe((value) => selectedUuid = value);

    component.myPoll = mockFilledPollState.poll[0];
    setTimeout(() => {
      expect(votingFormEl).toBeTruthy();
      const firstOptionEl = voteDebugElement.nativeElement.querySelector('#option-0');
      firstOptionEl.triggerEventHandler('click', null);
      expect(selectedUuid).toEqual('unique_id_0');
    })
  });
});
