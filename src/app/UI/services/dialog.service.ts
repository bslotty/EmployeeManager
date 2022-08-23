import { Injectable } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { FormInputField } from '../components/form-field/form-field.component';
import { ConfirmComponent } from '../dialogs/confirm/confirm.component';
import { FormComponent } from '../dialogs/form/form.component';


@Injectable({
  providedIn: 'root'
})
export class DialogService {

  settings: MatDialogConfig = {
    minWidth: "300px",
    width: "400px",
    data: {},
    disableClose: true,
    maxHeight: "40%"
  };

  constructor(
    public dialog: MatDialog,
  ) { }


  open(component): Observable<any> {
    return this.dialog.open(component, this.settings).afterClosed();
  }


  initSettings(title: string, message: string) {
    this.settings.data.title = title
    this.settings.data.message = message;
  }

  initFormSettings(form: UntypedFormGroup, maps: FormInputField[]) {
    this.settings.data.form = form;
    this.settings.data.control_map = maps;
  }

}
