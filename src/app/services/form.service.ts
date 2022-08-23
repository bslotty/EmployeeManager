import { Injectable } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { FormInputField, FormInputTypes } from '../UI/components/form-field/form-field.component';
import { FormGeneralService } from '../UI/services/form-general.service';
import { Department, Employee, RewardTransaction } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(
    public _general: FormGeneralService,
    public builder : UntypedFormBuilder,
  ) { }



  initTextSearchForm(): UntypedFormGroup {
    return this.builder.group({
      term: ["", [Validators.minLength(2)]],
    })
  }

  textSearchMap(form: UntypedFormGroup): FormInputField {
    return new FormInputField()
      .setLabel("Search")
      .setType(FormInputTypes.text)
      .setControl(form.get("term"));
  }


  initRewardTransactionForm(): UntypedFormGroup {
    return this.builder.group({
      item        : ["", Validators.required],
      cost        : [""],
      status      : [""],
      ordered_on  : [""],
      completed_on: [""],
    });
  }

  rewardTransactionFormMap(form: UntypedFormGroup, rewardTransaction: RewardTransaction, itemList): FormInputField[] {
    return [
      new FormInputField()
        .setLabel("Item")
        .setType(FormInputTypes.select)
        .setOptions(itemList.map(i => {
          return {
            id  : i.id,
            name: i.name
          }
        }))
        .setControl(form.get("item")),

      new FormInputField()
        .setLabel("Cost")
        .setType(FormInputTypes.text)
        .setControl(form.get("cost"))
        .disable(),


      new FormInputField()
        .setLabel("Status")
        .setType(FormInputTypes.text)
        .setControl(form.get("status"))
        .disable(),

      new FormInputField()
        .setLabel("Ordered On")
        .setType(FormInputTypes.date)
        .setControl(form.get("ordered_on"))
        .disable(),

      new FormInputField()
        .setLabel("Completed On")
        .setType(FormInputTypes.date)
        .setControl(form.get("completed_on"))
        .disable()
    ];
  }




  initAccountForm(): UntypedFormGroup {
    return this.builder.group({
      first     : ["", Validators.required],
      last      : ["", Validators.required],
      email     : ["", Validators.required],
      phone     : ["", Validators.required],
      department: ["", Validators.required],
      manager   : ["",],
    });
  }

  accountFormMap(form: UntypedFormGroup): FormInputField[] {
    let departments = [];

    for (const [propertyKey, propertyValue] of Object.entries(Department)) {
      if (!Number.isNaN(Number(propertyKey))) {
        continue;
      }
      departments.push({ id: propertyValue, name: propertyKey });
    }

    return [
      new FormInputField()
        .setLabel("First Name")
        .setType(FormInputTypes.text)
        .setControl(form.get("first")),

      new FormInputField()
        .setLabel("Last Name")
        .setType(FormInputTypes.text)
        .setControl(form.get("last")),


      new FormInputField()
        .setLabel("email")
        .setType(FormInputTypes.email)
        .setControl(form.get("email")),

      new FormInputField()
        .setLabel("phone")
        .setType(FormInputTypes.phone)
        .setControl(form.get("phone")),

      new FormInputField()
        .setLabel("Department")
        .setType(FormInputTypes.select)
        .setOptions(departments.map(d => {
          return {
            id  : d.id,
            name: d.name,
          }
        }))
        .setControl(form.get("department")),

      new FormInputField()
        .setLabel("Manager")
        .setType(FormInputTypes.text)
        .setControl(form.get("manager"))
        .disable(),

    ];
  }


  initAccountSelect(): UntypedFormGroup {
    return this.builder.group({
      account: ["", Validators.required]
    });
  }

  accountSelectFormMap(form: UntypedFormGroup, accounts: Employee[]): FormInputField[] {
    return [
      new FormInputField()
      .setLabel("Account")
      .setType( FormInputTypes.select )
      .setOptions( accounts.map(a => { return { id: a.id, name: `${a.first} ${a.last}`} }) )
      .setControl( form.get("account") )
    ];
  }
  

  initTimeSheetRange(): UntypedFormGroup{
    return this.builder.group({
      range: new FormGroup({
        start: new FormControl(""),
        end: new FormControl("")
      })
    });
  }


  timeSheetRangeFormMap(form: UntypedFormGroup): FormInputField[]{
    return [
      new FormInputField()
      .setLabel("Range")
      .setType( FormInputTypes.dateRange )
      .setControl(form.get("range"))
    ];
  }



  
  initVacationForm(): UntypedFormGroup {
    return this.builder.group({
      date: ["", Validators.required],
      hours: ["", Validators.required]
    });
  }


  vacationFormMap(form: UntypedFormGroup): FormInputField[]{
    return [
      new FormInputField()
      .setLabel("Date")
      .setType( FormInputTypes.date )
      .setControl(form.get("date")),

      new FormInputField()
      .setLabel("Hours")
      .setType( FormInputTypes.text )
      .setControl(form.get("hours"))
    ];
  }




  
  initTimeSheetEntry(): UntypedFormGroup{
    return this.builder.group({
      code: ["", Validators.required]
    });
  }


  timeSheetEntryFormMap(form: UntypedFormGroup): FormInputField[]{
    return [
      new FormInputField()
      .setLabel("Code")
      .setType( FormInputTypes.password )
      .setControl(form.get("code"))
    ];
  }
}
