import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { IconButton } from 'src/app/UI/components/icon/icon.component';
import { MatColor } from 'src/app/UI/services/utilities.service';

@Component({
  selector: 'app-reward-transaction-details',
  templateUrl: './reward-transaction-details.component.html',
  styles: [
  ]
})
export class RewardTransactionDetailsComponent implements OnInit {


  title: string = "NOT SET";
  message: string = "NOT SET";
  balance: number;
  header_actions: IconButton[] = [
    new IconButton("cancel")
      .setIconName("x")
      .setButtonColor(MatColor.transparent)
      .setIconColor(MatColor.primary),
  ];

  constructor(
    public _diagref: MatDialogRef<RewardTransactionDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public _data: DataService,
  ) { }

  ngOnInit(): void {
    this.title = this.data.title;
    this.message = this.data.message;


    this.data.form.get("item").valueChanges.subscribe(f => {
      this.data.form.get("cost").setValue(this._data.rewardItems.value.find(i => i.id == f).cost);
    });


    this.balance = this.data.employee.getBalance();
  }

  header_event(e) {
    if (e == "close" || e == "cancel") {
      this._diagref.close(false);
    }
  }

  save() {
    if (this.data.form.valid && this.data.form.dirty && this.balanceValid()) {
      this.data.row.setItem(this._data.rewardItems.value.find(i => i.id == this.data.form.get("item").value))
      this._diagref.close(this.data.row);
    }
  }

  balanceValid(): boolean {
    //  Testing
    return true;

    if (this.data.form.get("cost").value != undefined) {
      return Math.abs(this.data.form.get('cost').value) < this.balance
    } else {
      return false;
    }

  }

}
