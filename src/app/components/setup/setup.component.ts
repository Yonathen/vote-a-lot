import { Component, OnInit, Input } from '@angular/core';
import { Validators,FormControl,FormGroup,FormBuilder, FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ControlType } from 'src/app/enums/control-type';
import { MyPollState } from 'src/app/interfaces/my-poll-state';
import { addOption, removeOption, updateOption, updatePoll } from 'src/app/state/my-poll.actions';
import { selectMyPoll } from 'src/app/state/my-poll.selectors';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit { 

  @Input() loaded: boolean = false;
  public myPoll$: Observable<MyPollState> = this.store.select(selectMyPoll);
  public myPollState: MyPollState  = { poll: [] };

  private _pollForm: FormGroup = new FormGroup({});

  public readonly maxLength: number = 80;
  public readonly minOptions: number = 2;
  public readonly maxOptions: number = 10;

  public get pollForm() {
    return this._pollForm;
  }

  public get options() { 
    return this.pollForm.controls['options'] as FormArray; 
  }

  public set pollForm(thePollForm: FormGroup) {
    this._pollForm = thePollForm;
  }

  constructor(
    public fb: FormBuilder,
    private store: Store
  ) {
  }

  ngOnInit(): void {
    this.myPoll$.subscribe(myPollState => {
      if( myPollState && myPollState.poll[0] ) {
        this.loaded = myPollState.loaded || true;
        this.myPollState = myPollState;
        this.setPollForm();
      }
    })
  }

  enableRemoveOption(type: ControlType = ControlType.Option): boolean {
    return (
      type === ControlType.Option &&
      this.options?.length > this.minOptions
    );
  }

  enableAddOption(): boolean {
    const value = this.pollForm.controls[ControlType.NewOption].value;
    return value && this.options?.length < this.maxOptions;
  }

  getControl(type: ControlType = ControlType.Question, value: string = ''): FormControl {
    const validators = [Validators.maxLength(this.maxLength)]
    if (type !== ControlType.NewOption) {
      validators.push(Validators.required);
    }
    return new FormControl(value, Validators.compose(validators));
  }

  setPollForm() {
    const { question, options } = this.myPollState.poll[0];
    this.pollForm = this.fb.group({
      [ControlType.Question]: this.getControl(ControlType.Question, question),
      [ControlType.NewOption]: this.getControl(ControlType.NewOption),
      [ControlType.Options]: this.fb.array([]),
    });

    for (const option of options) {
      const optionControl = this.getControl(ControlType.Option, option.label);
      const optionForm = this.fb.group({
        [ControlType.Option]: optionControl
      });
      this.options.push(optionForm);
    }
  }

  removeOption(index: number) {
    const { options } = this.myPollState.poll[0];
    this.store.dispatch(removeOption({ uuid: options[index].uuid }))
  }

  updateQuestion() {
    const questionControl = this.pollForm.controls[ControlType.Question];
    if ( questionControl.valid ) {
      this.store.dispatch(updatePoll({ question: questionControl.value }));
    }
  }

  updateOptions(index: number) {
    const optionForm = this.options.at(index) as FormGroup;
    const optionControl = optionForm.controls[ControlType.Option];
    if (optionControl.valid) {
      const { options } = this.myPollState.poll[0];
      this.store.dispatch(updateOption({ uuid: options[index].uuid, label: optionControl.value }))
    }
  }

  addOption() {
    const value = this.pollForm.controls[ControlType.NewOption].value;
    this.store.dispatch(addOption({ option : { uuid: uuidv4(), label: value, vote: 0 }}));
    this.pollForm.controls[ControlType.NewOption].setValue('');
  }

}
