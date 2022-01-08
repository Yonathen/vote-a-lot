import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollPanelsComponent } from './poll-panels.component';

describe('PollPanelsComponent', () => {
  let component: PollPanelsComponent;
  let fixture: ComponentFixture<PollPanelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollPanelsComponent ]
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
