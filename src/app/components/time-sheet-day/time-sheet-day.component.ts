import { WeekDay } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { DataService, DayTimeClockEntry, TimeClockDuration, TimeClockEntry, TimeOff, TimeOffStatus } from 'src/app/services/data.service';

@Component({
  selector: 'app-time-sheet-day',
  templateUrl: './time-sheet-day.component.html',
  styles: [
  ]
})
export class TimeSheetDayComponent implements OnInit {

  @Input() entry: DayTimeClockEntry;
  vacation_hours: number;


  constructor(
    public _data: DataService,
  ) { }

  ngOnInit(): void {
    this._data.activeEmployee.time_off.forEach(v => { 
      if (v.status == TimeOffStatus.Approved){
        let hi;

        v.dates.forEach((d, i) => { 
          if (`${d.getFullYear()}${d.getDate()}${d.getMonth()}` == `${this.entry.date.getFullYear()}${this.entry.date.getDate()}${this.entry.date.getMonth()}`){
            hi = i;
          }
        })
        
        this.vacation_hours = v.hours[hi];
      }
    });

  }
}

