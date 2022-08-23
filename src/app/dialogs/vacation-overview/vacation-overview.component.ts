import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService, TimeOff, TimeOffStatus } from 'src/app/services/data.service';
import { FormService } from 'src/app/services/form.service';
import { MatColor } from 'src/app/UI/services/utilities.service';

@Component({
  selector: 'app-vacation-overview',
  templateUrl: './vacation-overview.component.html',
  styles: [
  ]
})
export class VacationOverviewComponent implements OnInit {

  readonly MatColor      = MatColor;
  readonly TimeOffStatus = TimeOffStatus;

  request: TimeOff;
  actionable: boolean = false;
  cancelable: boolean = false;

  constructor(
    public _diagref: MatDialogRef<VacationOverviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public _data: DataService,
    public _form: FormService,
  ) { }


  ngOnInit(): void {
    this.request    = this.data.request;
    this.actionable = this.data.request.status == 0 &&
    this._data.activeEmployee.id == this.data.requester?.manager;

    this.cancelable = this.data.request.status == 0 && this._data.activeEmployee.id == this.data.requester;
  }


  close() {
    this._diagref.close();
  }


  approve(){
    this.request.status = TimeOffStatus.Approved;
    this.close();
  }

  deny(){
    this.request.status = TimeOffStatus.Denied;
    this.close();
  }


  cancel(){
    this.request.status = TimeOffStatus.Canceled;
    this.close();
  }
}
