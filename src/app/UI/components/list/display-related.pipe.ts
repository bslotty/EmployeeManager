import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayRelated'
})
export class DisplayRelatedPipe implements PipeTransform {

  constructor() { };

  transform(value: any, arg: string): unknown {
    // console.log(`${arg}: ${value}`);
    if ( typeof value === "object" ) {
      switch (arg) {
        case "species":
          return value.name;
        
        case "type":
          return value.name;
      }

      
    } else {
      return value;
    }
  }

}
