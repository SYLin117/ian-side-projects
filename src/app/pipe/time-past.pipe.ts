import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timePast'
})
export class TimePastPipe implements PipeTransform {

  transform(value: number): string {
    let date1 = new Date()
    let date2 = new Date(value)
    var difference = date1.getTime() - date2.getTime();

    var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
    difference -= daysDifference * 1000 * 60 * 60 * 24

    var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
    difference -= hoursDifference * 1000 * 60 * 60

    var minutesDifference = Math.floor(difference / 1000 / 60);
    difference -= minutesDifference * 1000 * 60

    var secondsDifference = Math.floor(difference / 1000);

    // console.log('difference = ' +
    //   daysDifference + ' day/s ' +
    //   hoursDifference + ' hour/s ' +
    //   minutesDifference + ' minute/s ' +
    //   secondsDifference + ' second/s ');
    // console.log('daysDifference: ' + daysDifference)
    return daysDifference + ' days ago'
  }

}
