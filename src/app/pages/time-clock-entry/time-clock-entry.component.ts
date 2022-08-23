import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DataService, TimeClockEntry, TimeClockEntryType } from 'src/app/services/data.service';
import { FormService } from 'src/app/services/form.service';
import { FormInputField } from 'src/app/UI/components/form-field/form-field.component';

@Component({
  selector: 'app-time-clock-entry',
  templateUrl: './time-clock-entry.component.html',
  styles: [
  ]
})
export class TimeClockEntryComponent implements OnInit {

  readonly TimeClockEntryType = TimeClockEntryType;

  type:TimeClockEntryType = TimeClockEntryType.In;

  form: FormGroup;
  controls: FormInputField[];

  constructor(
    public _data: DataService,
    public _form: FormService,
  ) { }
  

  ngOnInit(): void {
    this.form     = this._form.initTimeSheetEntry();
    this.controls = this._form.timeSheetEntryFormMap(this.form);
  }


  createEntry(){
    let d = new Date();
    let entry = this._data.newTimeClockEntry(d, this.type);
    this._data.activeEmployee.addTimeClockEntry(entry);
  }


  setType(type:TimeClockEntryType){
    this.type = type;
  }
}
