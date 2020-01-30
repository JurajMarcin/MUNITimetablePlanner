import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rooms'
})
export class RoomsPipe implements PipeTransform {

  transform(value: string[]): any {
    return value.join(', ');
  }

}
