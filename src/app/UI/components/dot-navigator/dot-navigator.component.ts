import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MatColor } from '../../services/utilities.service';

@Component({
  selector: 'app-dot-navigator',
  templateUrl: './dot-navigator.component.html',
  styles: [
  ]
})
export class DotNavigatorComponent {

  @Input() dots : DotNavigatorDot[] = [];
  @Input() index: number = 0;

  @Output() indexChange: EventEmitter<number | string> = new EventEmitter(true);

  public size: number = 24;

  constructor(public _data:DataService) { }
  
  emit(event: number | string){
    this.indexChange.emit(event);
  }

  //  HTML Accessor
  public get MatColor(): typeof MatColor {
    return MatColor;
  } 

}

export class DotNavigatorDot {
  color   : MatColor  = MatColor.warn;
  iconName: string    = "circle";
  disabled: boolean   = false;

  constructor(){}

  setColor(color: MatColor){
    this.color = color;
    return this;
  }

  setIconName(name: string){
    this.iconName = name;
    return this;
  }

  setDisabled(bool: boolean){
    this.disabled = bool;
    return this;
  }

}