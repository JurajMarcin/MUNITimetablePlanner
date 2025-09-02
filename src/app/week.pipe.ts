import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'week',
  standalone: false
})
export class WeekPipe implements PipeTransform {

  transform(value: 'both'|'odd'|'even'): any {
    return value === 'odd' ? 'Odd week' : value === 'even' ? 'Even week' : '';
  }
}
