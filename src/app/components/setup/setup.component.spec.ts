import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ControlType } from 'src/app/enums/control-type';
import { storeServiceStub } from 'src/app/shared/test/store-service-stup';

import { SetupComponent } from './setup.component';

describe('SetupComponent', () => {
  let component: SetupComponent;
  let fixture: ComponentFixture<SetupComponent>;
  let pollForm: FormGroup;
  let question: any;
  let options: any;
  let newOption: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ SetupComponent ],
      providers: [{provide: Store, useValue: storeServiceStub}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('poll form', () => {
    beforeEach(() => {
      pollForm = component.pollForm;
      question = component.pollForm.controls[ControlType.Question];
      options = component.pollForm.controls[ControlType.Options];
      newOption = component.pollForm.controls[ControlType.NewOption];
    });

    it('validates correctly when a form is empty', () => {
      expect(pollForm.valid).toBeFalsy();
      expect(question.valid).toBeFalsy();

      for(let option of options.controls) {
        expect(option?.controls['option'].valid).toBeFalsy();
      }

      expect(newOption.valid).toBeTruthy();
    });


    it('validates correctly when the form is filled', () => {
      question.setValue('What is the value of pi?');
      options.controls[0].controls['option'].setValue('3.14');
      options.controls[1].controls['option'].setValue('3.144');

      expect(pollForm.valid).toBeTruthy();
      expect(question.valid).toBeTruthy();
      for(let option of options.controls) {
        expect(option?.controls['option'].valid).toBeTruthy();
      }
    })
  });
});

