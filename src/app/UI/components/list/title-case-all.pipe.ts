import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleCaseAll'
})
export class TitleCaseAllPipe implements PipeTransform {

  transform(value: string): unknown {
    let s = value.replace("_", " ").split(" ");
    let v = s.map( s => s.substring(0,1).toUpperCase() + s.substring(1).toLowerCase() ).join(" ");

    // console.log(`value ${value}  s: ${s}, v${v}`);

    return v;
  }

}
