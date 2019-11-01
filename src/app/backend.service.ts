import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Presentation } from './interfaces/presentation.interface';
import { map } from 'rxjs/operators'

@Injectable({providedIn: 'root'})
export class BackendService {

  private endpoint = 'https://pinoc.cz/data.json'

  constructor(private http: HttpClient) { }

  getPresentations() {
    return this.http.get(this.endpoint)
      .pipe(map(this.filterOutComments))
  }

  private filterOutComments = (events: Presentation[]) => events.filter(event => typeof event == 'object' && !event.disable)

  getRooms() {

    return this.http.get(this.endpoint)
      .pipe(
        map(this.filterOutComments),
        map((events: Presentation[]) => {

          let rooms : object = {}
          events.forEach(event => {
            rooms[event.room] = null
          })
          return Object.keys(rooms)

          /*let rooms: string[] = []

          events.forEach(event => {

            if (event.room && rooms.findIndex(element => element == event.room) == -1)
              rooms.push(event.room)

          })

          return rooms*/

        })
      )

  }
}
