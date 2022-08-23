import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, FormGroup, UntypedFormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { RewardTransactionDetailsComponent } from 'src/app/dialogs/reward-transaction-details/reward-transaction-details.component';
import { DataService, Employee, RewardTransaction, RewardTransactionStatus } from 'src/app/services/data.service';
import { FormService } from 'src/app/services/form.service';
import { FormInputField } from 'src/app/UI/components/form-field/form-field.component';
import { IconButton } from 'src/app/UI/components/icon/icon.component';
import { DialogService } from 'src/app/UI/services/dialog.service';
import { MatColor } from 'src/app/UI/services/utilities.service';

@Component({
  selector: 'app-reward-log',
  templateUrl: './reward-log.component.html',
  styles: [
  ]
})
export class RewardLogComponent implements OnInit {

  //  Enum Accessor
  readonly MatColor = MatColor;
  readonly RewardTransactionStatus = RewardTransactionStatus;

  //  Headers
  title = 'Rewards';
  headerButtons = [
    new IconButton("create")
      .setIconName("plus")
      .setButtonColor(MatColor.transparent)
      .setIconColor(MatColor.accent)
  ];


  //  Table
  masterList: RewardTransaction[];
  filteredList: RewardTransaction[];
  dataSource: MatTableDataSource<RewardTransaction> = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  visibleColumns = [
    "item",
    "cost",
    "status",
    "view"
  ];


  //  Form
  form: UntypedFormGroup;
  controls: FormInputField;

  id: number;
  emp: Employee;
  balance = 0;

  constructor(
    public _data: DataService,
    public _form: FormService,
    public _dialog: DialogService,
    public activeRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    //  Form 
    this.form = this._form.initTextSearchForm();
    this.controls = this._form.textSearchMap(this.form);
    this.form.get("term").setValue("");

    this.form.get("term").valueChanges.subscribe(t => {
      this.dataSource.filter = t;
    })


    this.id = +this.activeRoute.snapshot.paramMap.get("id");

    if (this.id != 0) {
      this.emp = this._data.employees.value.find(e => e.id == this.id);
      this.headerButtons = [];
    } else {
      this.emp = this._data.activeEmployee;
    }

    this.setDataSource( this.emp.reward_transactions );
  }

  setDataSource(list) {
    //  Update Balance
    this.balance = this.emp.reward_transactions.map(r => r.item.cost).reduce((a, b) => +a + +b);

    //  Datasource
    this.dataSource = new MatTableDataSource(list);

    //  Custom Sorter
    this.dataSource.sortingDataAccessor = (reward, header) => {
      if (header == "cost") {
        return reward.item.cost;
      } else if (header == "item") {
        return reward.item.name;
      } else {
        return reward[header];
      }
    }

    //  Stringify Filter
    this.dataSource.filterPredicate = (data, term) => {
      data.statusName = RewardTransactionStatus[data.status];
      return JSON.stringify(data).toLowerCase().indexOf(term.toLowerCase()) > -1;
    }

    //  Table Features
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }


  emit(event) {
    if (event == "create") {
      let row = this._data.newRewardTransaction();
      let form = this.setFormValues(row);
      this.openRewardDiag(form, row);
    }
  }

  view(row) {
    let form = this.setFormValues(row);
    this.openRewardDiag(form, row);
  }


  openRewardDiag(form: FormGroup, row: RewardTransaction) {
    this._dialog.settings.data.row = row;
    this._dialog.settings.data.employee = this.emp;
    this._dialog.initSettings("Reward", "");
    this._dialog.initFormSettings(form, this._form.rewardTransactionFormMap(form, row, this._data.rewardItems.value.sort((a, b) => a.name > b.name ? 1 : -1)))
    this._dialog.open(RewardTransactionDetailsComponent).subscribe(res => {
      if (res != false) {
        this.emp.addRewardTransaction(row);
        this.setDataSource( this.emp.reward_transactions )
      }

    });
  }

  setFormValues(row): FormGroup {
    let form = this._form.initRewardTransactionForm();
    form.get("status").setValue(RewardTransactionStatus[row.status]);
    form.get("ordered_on").setValue(row.ordered_on);
    form.get("completed_on").setValue(row.completed_on);
    if (row.item != undefined) {
      form.get("item").setValue(row.item.id);
      form.get("cost").setValue(row.item.cost);
    }


    if (row.status != 1) {
      form.get("item").disable();
    }

    return form;
  }
}
