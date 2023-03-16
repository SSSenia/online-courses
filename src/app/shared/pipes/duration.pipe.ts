import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: number): string {
    const result: string[] = [];
    const hours: number = Math.floor(value / 60 / 60);
    if(hours) result.push(hours + ' hours')
    value -= hours * 60 * 60;
    const minutes: number = Math.floor(value / 60);
    if(minutes) result.push(minutes + ' minutes')
    const seconds = value - (minutes * 60);
    if(seconds) result.push(seconds + ' seconds')
    return result.join(', ');
    ;
  }

}
