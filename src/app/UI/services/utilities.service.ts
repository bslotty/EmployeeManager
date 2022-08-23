import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from './dialog.service';
import { LoaderService } from './loader.service';
import { PingService } from './ping.service';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  //  General Functions
  //

  //  HTML Accessor
  public get MatColor(): typeof MatColor {
    return MatColor;
  } 
  
  constructor(
    public _dialog: DialogService,
    public _ping: PingService,
    public _loader: LoaderService,

    public router: Router,
    public route: ActivatedRoute
  ) { }

  formatDate(date: Date):string  {
    let year  = date.getFullYear()
    let month = date.getMonth() + 1;
    let day   = date.getDate();

    return `${year}-${month}-${day}`;
  }

  formatDateTime(date: Date):string  {
    let year  = date.getFullYear()
    let month = date.getMonth() + 1;
    let day   = date.getDate();
    let hour  = date.getHours();
    let min   = date.getMinutes();
    return `${year}-${month}-${day} ${hour}:${min}`;
  }
}


export enum MatColor {
  "primary",
  "accent",
  "warn",
  "transparent",
  "light",
  "dark",
}
