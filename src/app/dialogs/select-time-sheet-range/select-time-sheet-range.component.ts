import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { FormService } from 'src/app/services/form.service';
import { FormInputField } from 'src/app/UI/components/form-field/form-field.component';

@Component({
  selector: 'app-select-time-sheet-range',
  templateUrl: './select-time-sheet-range.component.html',
  styles: [
  ]
})
export class SelectTimeSheetRangeComponent implements OnInit {

  form: FormGroup;
  controls: FormInputField[];

  constructor(
    public _diagref: MatDialogRef<SelectTimeSheetRangeComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public _data: DataService,
    public _form: FormService,
    public route: Router,
  ) { }

  ngOnInit(): void {

    this.form = this._form.initTimeSheetRange();
    this.controls = this._form.timeSheetRangeFormMap(this.form);


    let currentDate = new Date();
    let startDate = new Date(currentDate.getFullYear(), 0, 1);
    let days = Math.floor((currentDate.getTime() - startDate.getTime()) /
      (24 * 60 * 60 * 1000));

    let weekNumber = Math.ceil(days / 7);
    let payWeek = weekNumber % 2;

    let end;
    if (payWeek == 0) {
      end = new Date(new Date().getTime() - 7 * (24 * 60 * 60 * 1000));
    } else {
      end = new Date(new Date().getTime() + 7 * (24 * 60 * 60 * 1000));
    }
    this.form.setValue({
      range: {
        start: currentDate,
        end: end
      }
    });


  }



  close(){
    this._diagref.close();
  }

  save(){
    this._diagref.close(this.form.value);
  }

}
