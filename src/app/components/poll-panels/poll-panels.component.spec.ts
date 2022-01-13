import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { resetPoll, updatePoll, updateOption, addOption, removeOption } from '../../state/my-poll.actions';
import { mockEmptyPollState, storeServiceStub } from '../../shared/test/store-service-stup';
import * as uuidWrapper from 'uuid';

import { PollPanelsComponent } from './poll-panels.component';

describe('PollPanelsComponent', () => {
  let component: PollPanelsComponent;
  let fixture: ComponentFixture<PollPanelsComponent>;
  let storeService: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollPanelsComponent ],
      providers: [{provide: Store, useValue: storeServiceStub()}]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PollPanelsComponent);
    component = fixture.componentInstance;
    storeService = TestBed.inject(Store);
    fixture.detectChanges();
    component.ngOnInit();
    jest.spyOn(storeService, 'dispatch')
      .mockImplementation(() => {});
    jest.spyOn(uuidWrapper, 'v4').mockReturnValue('unique_id');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct poll state', () => {
    expect(component.myPoll).toEqual(mockEmptyPollState.poll[0]);
  });

  it('should call reset poll dispatch on reset button', () => {
    component.onReset();
    expect(storeService.dispatch).toHaveBeenCalledWith(resetPoll());
  });

  it('should call update question dispatch on update question event', () => {
    component.updateQuestion('Sample question');
    expect(storeService.dispatch).toHaveBeenCalledWith(updatePoll({ question: 'Sample question'}));
  });

  it('should call update option dispatch on update option event', () => {
    component.updateOption({uuid: 'unique_id', label: 'Sample question'});
    expect(storeService.dispatch)
      .toHaveBeenCalledWith(
        updateOption({uuid: 'unique_id', label: 'Sample question'})
      );
  });

  it('should call add option dispatch on add option event', () => {
    component.addOption('Option label');
    expect(storeService.dispatch)
      .toHaveBeenCalledWith(
        addOption({ option: { uuid: 'unique_id', label: 'Option label', vote: 0}})
      );
  });

  it('should call remove option dispatch on remove option event', () => {
    component.removeOption('unique_id');
    expect(storeService.dispatch)
      .toHaveBeenCalledWith(
        removeOption({ uuid: 'unique_id'})
      );
  });
});
