import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'shortTime',
  standalone: false
})
export class ShortTimePipe extends DatePipe implements PipeTransform {

  transform(value: any): any {
    return super.transform(value, 'H:mm', '+0000');
  }

}
