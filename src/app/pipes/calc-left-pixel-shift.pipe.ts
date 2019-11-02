import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calcLeftPixelShift'
})
export class CalcLeftPixelShiftPipe implements PipeTransform {

  transform(startTime: string) {
    return this.leftPixelShift(startTime)
  }

  leftPixelShift(startTime: string) {

    const base = 17 * 60
    const [hour, minute] = startTime.split(':').map(x => parseInt(x))
    const minutes = (hour < 17 ? 24 + hour : hour) * 60 + minute - base

    return minutes / 60

  }

}
