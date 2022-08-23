import { Component, Input, OnInit } from '@angular/core';
import { MatColor } from '../../services/utilities.service';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styles: [
  ]
})
export class IconComponent implements OnInit {

  @Input() name: string    = "bug";
  @Input() color: MatColor = MatColor.warn;
  @Input() size: number    = 32;

  readonly MatColor = MatColor;

  constructor() { }

  ngOnInit(): void {

  }
}





export class IconButton {
  name       : string = ""
  iconName   : string = "bug";

  buttonColor: MatColor = MatColor.warn;
  iconColor  : MatColor = MatColor.warn;

  constructor(name: string){
    this.name = name;
  }

  setName(name: string){
    this.name = name;
    return this;
  }

  setButtonColor(color: MatColor){
    this.buttonColor = color;
    return this;
  }

  setIconName(str: string){
    this.iconName = str;
    return this;
  }

  setIconColor(color: MatColor){
    this.iconColor = color;
    return this;
  }

}