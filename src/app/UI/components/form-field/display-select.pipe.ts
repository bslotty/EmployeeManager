import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displaySelect'
})
export class DisplaySelectPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    return value.name;
  }

}
