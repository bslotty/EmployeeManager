import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatColor } from '../../services/utilities.service';
import { IconButton } from '../icon/icon.component';

@Component({
  selector: 'app-button-bar',
  templateUrl: './button-bar.component.html',
  styles: [
  ]
})
export class ButtonBarComponent implements OnInit {

  @Input() buttons: IconButton[] = [];
  @Output() event: EventEmitter<string> = new EventEmitter();


  //  HTML Accessor
 readonly MatColor = MatColor;

  constructor() { }

  ngOnInit(): void { }

  emit(event: string) {
    this.event.emit(event);
  }

}
