import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormInputField } from '../../components/form-field/form-field.component';
import { IconButton } from '../../components/icon/icon.component';
import { MatColor } from '../../services/utilities.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: [
  ]
})
export class FormComponent implements OnInit {

  form:UntypedFormGroup;
  control_map: FormInputField[] = [];

  title: string = "NOT SET";
  message: string = "NOT SET";

  header_actions: IconButton[] = [
    new IconButton("save")
      .setIconName("save")
      .setButtonColor(MatColor.transparent)
      .setIconColor(MatColor.accent),
      
    new IconButton("cancel")
      .setIconName("x")
      .setButtonColor(MatColor.transparent)
      .setIconColor(MatColor.primary),
  ];

  constructor(    
    public _diagref: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public cdRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.title       = this.data.title;
    this.form        = this.data.form;
    this.control_map = this.data.control_map;

    this.cdRef.detectChanges();

    // this.form.valueChanges.subscribe(v =>{
    //   console.log("form.update:",v);
    // });
  }

  header_event(e){
    if (e == "close"){
      this._diagref.close();
    } else if (e == "save"){
      console.log(this.form.value);
      this._diagref.close(this.form.value);
    } else {
      this._diagref.close();
    }
  }

}

