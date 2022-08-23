import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { KeyObject } from 'crypto';
import { DataService, Department, DepartmentIcon, Employee } from 'src/app/services/data.service';
import { FormService } from 'src/app/services/form.service';
import { FormInputField } from 'src/app/UI/components/form-field/form-field.component';
import { IconButton } from 'src/app/UI/components/icon/icon.component';
import { MatColor } from 'src/app/UI/services/utilities.service';

@Component({
  selector: 'app-select-account',
  templateUrl: './select-account.component.html',
  styles: [
  ]
})
export class SelectAccountComponent implements OnInit {

  readonly DepartmentIcon = DepartmentIcon;
  readonly Department     = Department;
  readonly MatColor       = MatColor;

  title  : string = "NOT SET";
  message: string = "NOT SET";

  // form: FormGroup;
  balance: number;

  header_actions: IconButton[] = [
    new IconButton("cancel")
      .setIconName("x")
      .setButtonColor(MatColor.transparent)
      .setIconColor(MatColor.primary),
  ];

  form     : FormGroup;
  formField: FormInputField;

  filteredAccounts: Employee[];
  visibleAccounts : Employee[];
  excluded        : number;

  deptIcons = [];

  filtered_start : number = 0;
  filtered_length: number = 7;
  filtered_page  : number = 1;
  filtered_page_limit: number;

  constructor(
    public _diagref: MatDialogRef<SelectAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public _data: DataService,
    public _form: FormService,
    public route: Router,
  ) { }

  ngOnInit(): void {
    this.title = this.data.title;
    this.message = this.data.message;

    //  Setup Form
    this.form      = this._form.initTextSearchForm();
    this.formField = this._form.textSearchMap( this.form );


    //  Listen to Changes
    this.formField.control.valueChanges.subscribe(v => {
      this.filterAccounts(v);
    });



    this.formField.control.setValue("");
    this.deptIcons = Object.values( DepartmentIcon );
  }

  selectUser(account: Employee){
    this._data.activeEmployee = account;
    this.route.navigate(["account-overview"]);
    this._diagref.close(account);

  }

  close(){
    this._diagref.close();
  }

  filterBySection(section: string) {
    let key = Object.keys(DepartmentIcon).find(key => DepartmentIcon[key] === section);
    this.filtered_page = 1;

    this.form.get("term").setValue( key );

  }

  filterAccounts(v: string){
    this.filteredAccounts = this._data.employees.value.filter( a => { 
      let search = JSON.stringify(a) + Department[ a.department ] + a.department;
      return search.toLowerCase().includes( v.toLowerCase() ) 
    });


    this.visibleAccounts  = this.filteredAccounts.filter( (a,i) => i < this.filtered_length * this.filtered_page && 
      i > (this.filtered_length * this.filtered_page) - this.filtered_length );

    if (this.filteredAccounts.length != this.visibleAccounts.length) {
      this.excluded = this.filteredAccounts.length - this.visibleAccounts.length 
      this.filtered_page_limit = Math.ceil(this.filteredAccounts.length / this.filtered_length)
    } else {
      this.excluded = undefined;
    }
  }

  prevResults(){
    if (this.filtered_page != 1){
      this.filtered_page = this.filtered_page - 1;
      this.filterAccounts( this.form.value.term );
    }
  }

  nextResults(){
    this.filtered_page_limit = Math.ceil(this.filteredAccounts.length / this.filtered_length)

    if (this.filtered_page < this.filtered_page_limit )  {
      this.filtered_page = this.filtered_page + 1;
      this.filterAccounts( this.form.value.term );
    }
  }
}
