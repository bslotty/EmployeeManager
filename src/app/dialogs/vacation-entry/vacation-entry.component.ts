import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService, TimeOff } from 'src/app/services/data.service';
import { FormService } from 'src/app/services/form.service';
import { FormInputField } from 'src/app/UI/components/form-field/form-field.component';
import { MatColor } from 'src/app/UI/services/utilities.service';

@Component({
  selector: 'app-vacation-entry',
  templateUrl: './vacation-entry.component.html',
  styles: [
  ]
})
export class VacationEntryComponent implements OnInit {
  
  readonly MatColor = MatColor;

  formList: FormGroup[] = [];
  controls: FormInputField[][] = [];

  constructor(
    public _diagref: MatDialogRef<VacationEntryComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public _data: DataService,
    public _form: FormService,
    public route: Router,
  ) { }


  ngOnInit(): void {
    this.addVacationDay();
  }


  close() {
    this._diagref.close();
  }

  addVacationDay(){
    let form = this._form.initVacationForm();
    let controls = this._form.vacationFormMap(form);

    this.formList.push(form);
    this.controls.push(controls);
  }

  removeVacationDay(index: number){
    this.formList = this.formList.filter((f,i) => i != index);
    this.controls = this.controls.filter((c,i) => i != index);
  }

  formsValid(): boolean {
    let valid = true;

    this.formList.forEach(f => {
      if (f.invalid || f.pristine || f.disabled) {
        valid = false;
      }
    });
    
    return valid;
  }


  submit(){
    if (this.formsValid()){
      let dates = this.formList.map(f => f.value.date)
      let hours = this.formList.map(f => f.value.hours)

      this._data.activeEmployee.addTimeOff( this._data.newTimeOffRequest(dates, hours) )
      this._diagref.close(true);
    }
  }
}
