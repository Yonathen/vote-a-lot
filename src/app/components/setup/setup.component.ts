import { Component, OnInit } from '@angular/core';
import { Validators,FormControl,FormGroup,FormBuilder, FormArray } from '@angular/forms';
import { ControlType } from 'src/app/enums/control-type';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit { 

  private _submitted: boolean = false;
  private _pollForm: FormGroup = new FormGroup({});

  public readonly maxLength: number = 80;
  public readonly minOptions: number = 2;
  public readonly maxOptions: number = 10;

  public get submitted() {
    return this._submitted;
  }

  public set submitted(isSubmitted: boolean) {
    this._submitted = isSubmitted;
  }

  public get pollForm() {
    return this._pollForm;
  }

  public get options() { 
    return this.pollForm.controls['options'] as FormArray; 
  }

  public set pollForm(thePollForm: FormGroup) {
    this._pollForm = thePollForm;
  }

  constructor(public fb: FormBuilder) {
    this.reset();
  }

  ngOnInit(): void {
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
    this.pollForm = this.fb.group({
      [ControlType.Question]: this.getControl(),
      [ControlType.NewOption]: this.getControl(ControlType.NewOption),
      [ControlType.Options]: this.fb.array([]),
    });

    let i = 0;
    while ( i < this.minOptions ) {
      this.addOption();
      i++;
    }
  }

  removeOption(index: number) {
    this.options.removeAt(index);
  }

  addOption() {
    const value = this.pollForm.controls[ControlType.NewOption].value;
    const optionForm = this.fb.group({
      [ControlType.Option]: this.getControl(ControlType.Option, value)
    });
    this.options.push(optionForm);
    this.pollForm.controls[ControlType.NewOption].setValue('');
  }

  reset() {
    this.setPollForm();
  }

}
