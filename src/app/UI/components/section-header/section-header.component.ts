import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconButton } from '../icon/icon.component';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styles: [
  ]
})
export class SectionHeaderComponent {

  @Input() title:   string                = "NOT SET";
  @Input() buttons: IconButton[]          = [];
  @Output() event:  EventEmitter<string>  = new EventEmitter();

  constructor() { }

  emit(action: string){
    this.event.emit(action);
  }
}

