import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

function genID(): string {
  return Math.round(Math.random() * 1000) + ""
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private __employees = require("../data/employees.json");
  private __rewardItems = require("../data/rewardItems.json");
  private __rewardTransactions = require("../data/rewardTransactions.json");

  public employees: BehaviorSubject<Employee[]>                   = new BehaviorSubject<Employee[]>([]);
  public rewardItems: BehaviorSubject<RewardItem[]>               = new BehaviorSubject<RewardItem[]>([]);
  public rewardTransactions: BehaviorSubject<RewardTransaction[]> = new BehaviorSubject<RewardTransaction[]>([]);

  public activeEmployee: Employee;


  constructor() { 

    // this.employees.subscribe(l => console.log("employee list: ", l))
    // this.rewardItems.subscribe(l => console.log("rewardItems list: ", l))
    // this.rewardTransactions.subscribe(l => console.log("rewardTransactions list: ", l))

    this.rewardItems.next( this.__rewardItems.map( r => {
      return new RewardItem(r.id)
        .setName(r.name)
        .setCost(r.cost);
    }));

    this.rewardTransactions.next( this.__rewardTransactions.map( r => {
      return new RewardTransaction(r.id)
        .setItem( this.rewardItems.value.find( i => i.id == r.item_id ))
        .setEmployeeID( r.employee_id )
        .setStatus(r.status)
        .setMetrics(r.ordered_on, r.completed_on);
    }));


    let emp_list = this.__employees.map( e => {
      return new Employee(e.id)
        .setName(e.first_name, e.last_name)
        .setContactDetails(e.phone_number, e.email)
        .setDepartment( e.department )
        .setRewardTransactions( this.rewardTransactions.value.filter( r => r.employee_id == e.id ))
        .setManager( e.manager );
    });

    emp_list.map( e => {
      //  Setup Subordinates
      e.setSubordinates( emp_list.filter(f => f.manager == e.id) )

      //  Add Yearly Completion
      e.reward_transactions.push( new RewardTransaction(+genID())
        .setEmployeeID(e.id)
        .setItem( this.rewardItems.value.find( r=> r.id == 101 ))
        .setMetrics( +genID() * 8.6400e+4, 1.051e+7 )
        .setStatus(2) )

      //  Get Balance
      let balance = e.getBalance();
      while (balance < 0) {
        let id = 101;
        if (balance < -10000 ){
          id = 101;
        } else if (balance < 5000){
          id =  102;
        } else {
          id =  103; 
        }

        let item = this.rewardItems.value.find( r=> r.id == id );
        e.reward_transactions.push( new RewardTransaction(+genID())
          .setEmployeeID(e.id)
          .setItem( item )
          .setMetrics( +genID() * 8.64e+4, 1.051e+7 )
          .setStatus(2) )


        balance = e.getBalance();
      }

      //  Adjust Department From Manager
      let dept;
      if (e.manager != 0){
        dept =  emp_list.find(m => m.id == e.manager).department;
      } else {
        dept = e.manager;
      }
      // e.setDepartment(dept);

    });




    this.employees.next( emp_list );

    this.activeEmployee = emp_list[2];
    console.log("Active Employee: ", this.activeEmployee);
  }



  newRewardTransaction(): RewardTransaction {
    return new RewardTransaction( +genID() )
      .setEmployeeID( this.activeEmployee.id )
      .setStatus(1)
  }

  newTimeClockEntry(date:Date, type: TimeClockEntryType): TimeClockEntry{
    return new TimeClockEntry( +genID(), date, type );
  }

  newDailyTimeClockEntry(date: Date): DayTimeClockEntry {
    return new DayTimeClockEntry( +genID(), date );
  }

  newTimeOffRequest(dates: Date[], hours: number[]): TimeOff {
    return new TimeOff( +genID(), dates, hours );
  }

}


export enum Department {
  "Engineering",
  "Human Resources",
  "Product Management",
  "Business Development",
  "Legal",
  "Marketing",
  "Services",
  "Support",
  "Sales"
}

export enum DepartmentIcon {
  "Engineering"          = "tool",
  "Human Resources"      = "feather",
  "Product Management"   = "package",
  "Business Development" = "briefcase",
  "Legal"                = "clipboard",
  "Marketing"            = "bar-chart",
  "Services"             = "settings",
  "Support"              = "help-circle",
  "Sales"                = "dollar-sign"
}


export class Employee {
  id   : number;
  first: string;
  last : string;
  phone: string;
  email: string;

  department  : Department;
  manager     : number;
  subordinates: Employee[];

  reward_transactions: RewardTransaction[];

  time_off          : TimeOff[] = [];
  time_clock_entries: TimeClockEntry[] = [];

  constructor(id: number){
    this.id = id;
    return this;
  }

  setName(first: string, last: string){
    this.first = first;
    this.last = last;
    return this;
  }

  setContactDetails(phone: string, email: string){
    this.phone = phone;
    this.email = email;
    return this;
  }

  setDepartment(id: number){
    // console.log("department: ", id )

    this.department = id //Department[];
    return this;
  }

  setManager(id: number){
    this.manager = id;
    return this;
  }

  setSubordinates(el: Employee[]) {
    this.subordinates = el;
    return this;
  }

  setRewardTransactions(transactions: RewardTransaction[]) {
    this.reward_transactions = transactions;
    return this;
  }

  addRewardTransaction(transaction: RewardTransaction) {
    this.reward_transactions.push(transaction);
    return this;
  }

  getBalance(): number {
    return this.reward_transactions.map(r => r.item.cost).reduce((a,b) => +a + +b);
  }

  addTimeClockEntry(entry: TimeClockEntry) {
    this.time_clock_entries.push(entry)
    return this;
  }

  addTimeOff(vacation: TimeOff){
    this.time_off.push(vacation);
    return this;
  }
}

export enum RewardTransactionStatus {
  "Denied",
  "Pending",
  "Approved",
  "Fulfilled"
}


export class RewardTransaction {
  id          : number;
  item        : RewardItem;
  employee_id : number;
  status      : RewardTransactionStatus;
  statusName  : string;  // For Filter
  ordered_on  : Date;
  completed_on: Date;

  constructor(id: number){
    this.id = id;
    this.ordered_on = new Date();
    return this;
  }

  setItem(item: RewardItem) {
    this.item = item;
    return this;
  }

  setEmployeeID(id: number){
    this.employee_id = id;
    return this;
  }

  setStatus( status: RewardTransactionStatus ) {
    this.status = status;
    return this;
  }

  setMetrics(created: number, completed: number){
    let d = new Date( ).getTime();

    this.ordered_on = new Date( d + created );
    
    // Data Fix
    if (completed == null ) completed = undefined;

    if (completed != undefined) {
      this.completed_on = new Date( d + completed );
      if (this.status == 1) {
        this.status = 2;
      }
    }
    
    return this;
  }
}

export class RewardItem {
  id  : number;
  name: string;
  cost: number;

  constructor(id: number){
    this.id = id;
    return this;
  }

  setName(name: string){
    this.name = name;
    return this;
  }

  setCost(cost: number){
    this.cost = cost;
    return this;
  }
}



export class DayTimeClockEntry {
  id           : number;
  date         : Date;
  entries      : TimeClockEntry[] = [];
  durations    : TimeClockDuration[] = [];
  total_hours  : number;
  total_minutes: number;

  constructor(id: number, date: Date){
    this.id   = id;
    this.date = date;
    return this;
  }

  addEntry(entry: TimeClockEntry) {
    this.entries.push(entry);
    return this;
  }

  calculateDurations() {
    this.entries.forEach((e,i) => { if (i > 0) {
      let track = true;
      if ( e.type == TimeClockEntryType.Out && this.entries[i -1].type == TimeClockEntryType.In) {
        track = false;
      }
      this.durations.push( new TimeClockDuration( this.entries[i -1].date, e.date, track ));
    }});
  }


  calculateTotals(){
    // console.log(this.durations);
    if (this.durations.length > 0){
      this.total_hours = this.durations.filter(t => t.track ).map(t => t.hours).reduce((a,b) => a + b);
      this.total_minutes = this.durations.filter(t => t.track ).map(t => t.minutes).reduce((a,b) => a + b);
  
      while (this.total_minutes >= 60) {
        this.total_hours += 1;
        this.total_minutes -= 60;
      }
    }
   
  }
}


export class TimeClockEntry {
  id  : number;
  date: Date;
  type: TimeClockEntryType;

  constructor(id:number, date: Date, type: TimeClockEntryType) {
    this.id   = id;
    this.date = date;
    this.type = type;
  }
}

export class TimeClockDuration {
  start  : Date;
  end    : Date;
  hours  : number;
  minutes: number;
  ms     : number;

  track: boolean = false;

  constructor(start: Date, end:Date, track:boolean){
    this.start   = start;
    this.end     = end;
    this.ms      = this.end.getTime() - this.start.getTime();
    this.hours   = Math.floor(this.ms / (60 * 60 * 1000));
    this.minutes = this.ms / (60 * 1000) % 60;

    this.track = track;
  }
}



export enum TimeClockEntryType {
  "In",
  "Out"
}


export class TimeOff {
  id          : number;
  requested_on: Date;
  completed_on: Date;
  status      : TimeOffStatus;
  dates       : Date[];
  hours       : number[];
  total_hours : number;

  constructor(id: number, dates: Date[], hours: number[]){
    this.id    = id;
    this.dates = dates;
    this.hours = hours;

    this.total_hours = this.hours.reduce((a,b) => +a + +b);

    this.requested_on = new Date();
    this.status       = TimeOffStatus.Pending;
  }
}

export enum TimeOffStatus {
  Pending, Denied, Approved, Canceled
}









