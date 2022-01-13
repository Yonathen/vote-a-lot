import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { selectPoll } from 'src/app/state/my-poll.selectors';
import { mockEmptyPollState, mockFilledPollState } from '../../shared/test/store-service-stup';


import { SetupComponent } from './setup.component';

describe('SetupComponent', () => {
  let component: SetupComponent;
  let fixture: ComponentFixture<SetupComponent>;
  let setDebugElement: DebugElement;
  let setFormEl = HTMLElement;
  let questionInputEl = HTMLInputElement;
  let addOptBtnEl = HTMLButtonElement;
  let addOptInputEl = HTMLInputElement;

  const sleep = (milliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ SetupComponent ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();

    setDebugElement = fixture.debugElement;
    setFormEl = setDebugElement.nativeElement.querySelector('#setup-form');
    questionInputEl = setDebugElement.nativeElement.querySelector('#input-question');
    addOptBtnEl = setDebugElement.nativeElement.querySelector('#button-add-option');
    addOptInputEl = setDebugElement.nativeElement.querySelector('#input-add-option');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows failed message if poll data is not valid', () => {
    component.myPoll = mockEmptyPollState.poll[0];
    setTimeout(() => {
      expect(setFormEl).toBeTruthy();
      expect(questionInputEl).toBeTruthy();
      expect(addOptBtnEl).toBeTruthy();
      expect(addOptInputEl).toBeTruthy();
      component.myPoll?.options.forEach((option, index) => {
        const optInputEl = setDebugElement.nativeElement.querySelector(`#option-${index}`);
        const optButtonEl = setDebugElement.nativeElement.querySelector(`#button-remove-${index}`);

        expect(optInputEl).toBeTruthy();
        expect(optButtonEl).toBeTruthy();
      });
    });
  });

  it('emits change in option', () => {
    let changed: any;
    component.updateOptionEmitter.subscribe((value) => changed = value);
    component.myPoll = mockFilledPollState.poll[0];
    setTimeout(() => {
      expect(setFormEl).toBeTruthy();
      const firstOptionEl = setDebugElement.nativeElement.querySelector('#option-0');
      firstOptionEl.setValue('Changed Option Label');
      expect(changed).toEqual({ uuid: 'unique_id_0', label: 'Changed Option Label'});
    })
  });

  it('emits change in question', () => {
    let changed: any;
    component.updateQuestionEmitter.subscribe((value) => changed = value);
    component.myPoll = mockFilledPollState.poll[0];
    setTimeout(() => {
      expect(setFormEl).toBeTruthy();
      setDebugElement.nativeElement
        .querySelector('#input-question')
        .setValue('Changed Question');
      expect(changed).toEqual('Changed Question');
    })
  });


});

