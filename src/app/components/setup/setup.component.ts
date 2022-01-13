import { Component, OnInit, OnChanges, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Validators,FormControl,FormGroup,FormBuilder, FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ControlType } from '../../enums/control-type';
import { MyPoll } from '../../interfaces/my-poll';
@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit, OnChanges { 

  loaded: boolean = false;
  @Input() reset: boolean = true;
  @Input() myPoll: MyPoll | undefined;

  @Output() updateQuestionEmitter: EventEmitter<string> 
    = new EventEmitter<string>();
  @Output() updateOptionEmitter: EventEmitter<{uuid: string, label: string}> 
    = new EventEmitter<{uuid: string, label: string}>();
  @Output() addOptionEmitter: EventEmitter<string> 
    = new EventEmitter<string>();
  @Output() removeOptionEmitter: EventEmitter<string> 
    = new EventEmitter<string>();

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

  public get reload() {
    return !this.loaded || this.reset;
  }

  constructor(
    public fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && this.myPoll && this.reload) {
      this.setPollForm();
      this.loaded = true;
    }
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
    const { question = '', options = [] } = this.myPoll || {};
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

  onUpdateQuestion() {
    const questionControl = this.pollForm.controls[ControlType.Question];
    if ( questionControl.valid ) {
      this.updateQuestionEmitter.emit(questionControl.value);
    }
  }

  onRemoveOption(index: number) {
    this.loaded = false;
    const { options = [] } = this.myPoll || {};
    if ( options.length > this.minOptions ) {
      this.removeOptionEmitter.emit(options[index].uuid);
    }
  }

  onAddOption() {
    this.loaded = false;
    const value = this.pollForm.controls[ControlType.NewOption].value;
    this.addOptionEmitter.emit(value);
    this.pollForm.controls[ControlType.NewOption].setValue('');
  }

  onUpdateOption(index: number) {
    const optionForm = this.options.at(index) as FormGroup;
    const optionControl = optionForm.controls[ControlType.Option];
    if (optionControl.valid) {
      const { options = [] } = this.myPoll || {};
      this.updateOptionEmitter.emit({ uuid: options[index].uuid, label: optionControl.value });
    }
  }

}
