import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Presentation } from '../interfaces/presentation.interface';
import { map } from 'rxjs/operators'
//@ts-ignore
import data from './data.json'
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BackendService {

  private endpoint = 'https://pinoc.cz/data.json'

  constructor(private http: HttpClient) { }

  getPresentations() {
    // return this.http.get(this.endpoint)
    //   .pipe(map(this.filterOutComments))
    return of(data).pipe(map(this.filterOutComments))
  }

  private filterOutComments = (events: Presentation[]) => events.filter(event => {
    return typeof event == 'object' && !event.disable
  })

  getRooms() {
    return of(data)
      .pipe(
        map(this.filterOutComments),
        map((events: Presentation[]) => {
          console.log(events)
          let rooms: object = {}
          events.forEach(event => {
            rooms[event.room] = null
          })
          return Object.keys(rooms)
        })
      )
  }
}
