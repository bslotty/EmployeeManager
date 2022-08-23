import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IconButton } from '../../components/icon/icon.component';
import { MatColor } from '../../services/utilities.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styles: [
  ]
})
export class ConfirmComponent implements OnInit {

  title  : string = "NOT SET";
  message: string = "NOT SET";

  header_actions: IconButton[] = [
    new IconButton("confirm")
      .setIconName("check")
      .setButtonColor(MatColor.accent)
      .setIconColor(MatColor.light),

    new IconButton("cancel")
      .setIconName("x")
      .setButtonColor(MatColor.transparent)
      .setIconColor(MatColor.primary),


  ];

  constructor(    
    public _diagref: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) { }

  ngOnInit(): void {
    this.title   = this.data.title;
    this.message = this.data.message;
  }

  header_event(e){
    if (e == "close" || e == "cancel"){
      this._diagref.close(false);
    } else if (e == "confirm"){
      this._diagref.close(true);
    }
  }
}
