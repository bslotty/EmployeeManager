import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SelectAccountComponent } from 'src/app/dialogs/select-account/select-account.component';
import { VacationOverviewComponent } from 'src/app/dialogs/vacation-overview/vacation-overview.component';
import { DataService, Department, Employee, TimeOff, TimeOffStatus } from 'src/app/services/data.service';
import { FormService } from 'src/app/services/form.service';
import { FormInputField } from 'src/app/UI/components/form-field/form-field.component';
import { IconButton } from 'src/app/UI/components/icon/icon.component';
import { DialogService } from 'src/app/UI/services/dialog.service';
import { MatColor } from 'src/app/UI/services/utilities.service';

@Component({
  selector: 'app-account-overview',
  templateUrl: './account-overview.component.html',
  styles: [
  ]
})
export class AccountOverviewComponent implements OnInit {

  readonly MatColor      = MatColor;
  readonly Department    = Department;
  readonly TimeOffStatus = TimeOffStatus;

  title = "Account Overview";
  headerButtons = [
    new IconButton("select")
      .setIconName("users")
      .setIconColor(MatColor.primary)
      .setButtonColor(MatColor.transparent)
  ];
  id: number;

  form: FormGroup;
  controls: FormInputField[];

  employee: Employee;

  vacationRequests: TimeOff[];

  constructor(
    public _data: DataService,
    public _form: FormService,
    public _dialog: DialogService,
    public activeRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.form = this._form.initAccountForm();
    this.controls = this._form.accountFormMap( this.form );

    this.employee = this._data.activeEmployee;
    this.id = +this.activeRoute.snapshot.paramMap.get("id");
    
    if (this.id == undefined){
      this.employee = this._data.employees.value.find(e => e.id == this.id);
    }

    this.activeRoute.paramMap.subscribe( p => {
      this.id = +p.get("id");
      if (this.id != 0){
        this.employee = this._data.employees.value.find(e => e.id == this.id);
      }
    
      this.setupFormValues(this.employee);
    })

    this.setupFormValues(this.employee);
  }

  emit(event) {
    if (event == "select"){
      this._dialog.initSettings("Select Account", "");
      this._dialog.open(SelectAccountComponent).subscribe(res => {

        if (res != undefined){
          this.employee = this._data.activeEmployee; 
          this.setupFormValues(this.employee);
        }
      })
    }
  }

  setupFormValues(emp: Employee){
    let manager;
    if (emp.manager != 0) {
      manager =  this._data.employees.value.find( e => e.id == emp.manager );
    }
    
    this.form.get("first").setValue( emp.first );
    this.form.get("last").setValue( emp.last );
    this.form.get("email").setValue( emp.email );
    this.form.get("phone").setValue( emp.phone );
    this.form.get("department").setValue( emp.department );
    if (manager != undefined){
      this.form.get("manager").setValue( `${manager.first} ${manager.last}` );
    } else { }

    this.form.disable();
  }


  viewVacation(request: TimeOff, employee: Employee) {
    this._dialog.settings.data.request = request;
    this._dialog.settings.data.requester = employee;
    this._dialog.open(VacationOverviewComponent).subscribe(res => {
      if (res != undefined){
        this.employee = this._data.activeEmployee; 
        this.setupFormValues(this.employee);
      }
    })
  }

}
