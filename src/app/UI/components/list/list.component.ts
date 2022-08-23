import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { MatColor } from '../../services/utilities.service';
import { IconButton } from '../icon/icon.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [
  ]
})
export class ListComponent implements OnInit {

  @Input    () list                  : Observable<any[]>;
  @Input    () columns               : string[] = [];
  @Input    () actions               : string[] = [];
  @Output   () event                 : EventEmitter<ListEvent> = new EventEmitter();
  @ViewChild(MatSort) sort           : MatSort;
  @ViewChild(MatPaginator) pagination: MatPaginator;
  dataSource: MatTableDataSource<any[]> = new MatTableDataSource([]);
  full_columns: string[] = [];

  possible_actions: IconButton[] = [
    new IconButton("view")
      .setButtonColor(MatColor.transparent)
      .setIconName("chevron-right")
      .setIconColor(MatColor.primary)
  ]

  readonly MatColors = MatColor;

  constructor() { }

  ngOnInit(): void {
    //  console.log("list: ", this.list);


    this.full_columns = [...this.columns];
    if (this.actions.length > 0) {
      this.full_columns.push("actions");
    }

    // console.log("full cols: ", this.full_columns);
    if (this.list != undefined){
      this.list.subscribe( item => {
        // this.dataSource = new MatTableDataSource([]);
        this.dataSource.data = item;
  
        setTimeout(()=>{
          this.dataSource.sort      = this.sort;
          this.dataSource.paginator = this.pagination;
        });
      });
    }
    
  }

  emit(row, action) {
    this.event.emit({ row: row, action: action });
  }

}



export class ListEvent {
  action: string;
  row: any;
}
