import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { storeServiceStub } from '../../shared/test/store-service-stup';

import { PollPanelsComponent } from './poll-panels.component';

describe('PollPanelsComponent', () => {
  let component: PollPanelsComponent;
  let fixture: ComponentFixture<PollPanelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollPanelsComponent ],
      providers: [{provide: Store, useValue: storeServiceStub()}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollPanelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
