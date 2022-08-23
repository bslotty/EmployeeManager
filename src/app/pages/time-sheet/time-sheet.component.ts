import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, map, tap } from 'rxjs';
import { SelectTimeSheetRangeComponent } from 'src/app/dialogs/select-time-sheet-range/select-time-sheet-range.component';
import { VacationEntryComponent } from 'src/app/dialogs/vacation-entry/vacation-entry.component';
import { DataService, DayTimeClockEntry,  TimeClockEntryType } from 'src/app/services/data.service';
import { FormService } from 'src/app/services/form.service';
import { FormInputField } from 'src/app/UI/components/form-field/form-field.component';
import { IconButton } from 'src/app/UI/components/icon/icon.component';
import { DialogService } from 'src/app/UI/services/dialog.service';
import { MatColor } from 'src/app/UI/services/utilities.service';

@Component({
  selector: 'app-time-sheet',
  templateUrl: './time-sheet.component.html',
  styles: [
  ]
})
export class TimeSheetComponent implements OnInit {

  dailyEntries: DayTimeClockEntry[] = [];
  week1: DayTimeClockEntry[] = [];
  week2: DayTimeClockEntry[] = [];

  weekList: DayTimeClockEntry[][] = []


  //  Headers
  title = 'Time Sheet';
  headerButtons = [
    
    new IconButton("range")
      .setIconName("calendar")
      .setButtonColor(MatColor.transparent)
      .setIconColor(MatColor.primary),

    new IconButton("vacation")
      .setIconName("globe")
      .setButtonColor(MatColor.transparent)
      .setIconColor(MatColor.primary),

    new IconButton("create")
      .setIconName("plus")
      .setButtonColor(MatColor.transparent)
      .setIconColor(MatColor.accent)
  ];

  startDate: Date;
  endDate: Date;



  constructor(
    public _data: DataService,
    public _form: FormService,
    public _dialog: DialogService,

    public router: Router,
  ) { }

  ngOnInit(): void {
    let currentDate = new Date();
    let end         = new Date(new Date().getTime() + 7 * (24 * 60 * 60 * 1000));
    this.populateTimeSheet(currentDate, end);
  }



  populateTimeSheet(start: Date, end: Date){
    let wfl_begin: WeekRange = new WeekRange(start);
    let wfl_end: WeekRange   = new WeekRange(end);
        this.startDate       = start;
        this.endDate         = end;

    //  Generate TimeClockEntries for Each day Between Period
    //    Random Punch-In from 6am to 10am
    //    Punch out 4hrs later
    //    Punch in 25-30 mins later
    //    Punch Out 3.9-5 hrs later
    let timeSheet: Date[] = [];
    let currentDay = wfl_end.last.getTime();
    let hourMS = 60 * 60 * 1000;

    let today = new Date();
    this._data.activeEmployee.time_clock_entries = this._data.activeEmployee.time_clock_entries.filter(e => {
      return `${e.date.getMonth()}${e.date.getDate()}` == `${today.getMonth()}${today.getDate()}`;
    });



    while (wfl_begin.first.getTime() <= currentDay) {
      let curD = new Date(currentDay)
      timeSheet.push(curD);

      //  Omit Sat/Sun
      if (curD.getDay() != 0 && curD.getDay() != 6 && curD.getDate() < new Date().getDate()) {

        let start = Math.floor((Math.random() * 2) + 6) //(Math.random() * 2) ;
        let lunchOutTo = Math.floor(start + (Math.random() * 2)) + 4;
        let lunchInFrom = Math.floor(lunchOutTo + (Math.random() * 0.5)) + 0.5
        let finish = Math.floor(lunchInFrom + Math.random() + 4);


        let date = new Date(curD.getFullYear(), curD.getMonth(), curD.getDate(), start, Math.random() * 60);
        this._data.activeEmployee.addTimeClockEntry(this._data.newTimeClockEntry(date, TimeClockEntryType.In))

        date = new Date(curD.getFullYear(), curD.getMonth(), curD.getDate(), lunchOutTo, Math.random() * 60);
        this._data.activeEmployee.addTimeClockEntry(this._data.newTimeClockEntry(date, TimeClockEntryType.Out))

        date = new Date(curD.getFullYear(), curD.getMonth(), curD.getDate(), lunchOutTo, lunchInFrom);
        this._data.activeEmployee.addTimeClockEntry(this._data.newTimeClockEntry(date, TimeClockEntryType.In))

        date = new Date(curD.getFullYear(), curD.getMonth(), curD.getDate(), finish, Math.random() * 60);
        this._data.activeEmployee.addTimeClockEntry(this._data.newTimeClockEntry(date, TimeClockEntryType.Out))

      }

      currentDay = currentDay - (24 * hourMS);
    }


    //  Reset
    this.dailyEntries = [];
    this.weekList = [];

    //  Sort
    timeSheet.sort((a, b) => a.getTime() - b.getTime()).forEach(d => {
      this.getDateEntries(d);
    });



    this.dailyEntries.forEach((d, i) => {
      let bucket = i / 7;

      if (this.weekList[Math.floor(bucket)] == undefined) {
        this.weekList[Math.floor(bucket)] = []
      }

      this.weekList[Math.floor(bucket)].push(d);

    })
  }

  getDateEntries(date: Date) {
    if (this._data.activeEmployee.time_clock_entries.length > 0) {
      let dailyEntry = this._data.newDailyTimeClockEntry(date);

      this._data.activeEmployee.time_clock_entries
        .filter(t => `${new Date(t.date.getFullYear(), t.date.getMonth(), t.date.getDate())}` == `${new Date(date.getFullYear(), date.getMonth(), date.getDate())}`)
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .forEach(e => dailyEntry.addEntry(e));

      dailyEntry.calculateDurations();
      dailyEntry.calculateTotals();

      this.dailyEntries.push(dailyEntry);
    }
  }


  emit(event) {
    console.log("headerEvenet: ", event);

    if (event == "range"){
      this._dialog.open(SelectTimeSheetRangeComponent).subscribe( res => {
        if (res != undefined) {
          this.populateTimeSheet(res.range.start, res.range.end);
        }
      });
    }

    if (event == "create"){
      this.router.navigate(["time-clock-entry"]);
    }

    if (event == "vacation") {
      this._dialog.open(VacationEntryComponent).subscribe( res => {
      });
    }
  }

}

export class WeekRange {
  first: Date;
  last: Date;

  constructor(date: Date) {
    console.log("wr.date: ", date);
    var curr = date;                            // get current date
    var first = curr.getDate() - curr.getDay();  // First day is the day of the month - the day of the week
    var last = first + 6;                       // last day is the first day + 6

    this.first = new Date(curr.setDate(first));
    this.last = new Date(curr.setDate(last));
  }
}

