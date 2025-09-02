import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rooms',
  standalone: false
})
export class RoomsPipe implements PipeTransform {

  transform(value: string[]): any {
    return value.join(', ');
  }

}
