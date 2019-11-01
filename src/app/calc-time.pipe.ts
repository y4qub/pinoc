import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'calcTime'
})
export class CalcTimePipe implements PipeTransform {

  transform(startTime: string, length: string) {
    return `${startTime} - ${this.m2t(this.t2m(startTime) + length)}`
  }

  t2m(t): number {

    const [_h, _m] = t.split(':').map(x => parseInt(x))
    return _h * 60 + _m

  }

  m2t(m): string {

    const _h = Math.floor(m / 60)
    const __h = (_h >= 24 ? _h - 24 : _h).toString()
    const _m = (m - _h * 60).toString()

    return `${__h.length == 1 ? '0' + __h : __h}:${_m.length == 1 ? '0' + _m : _m}`

  }

}
