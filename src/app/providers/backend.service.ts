import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Presentation } from '../interfaces/presentation.interface';
import { map, share } from 'rxjs/operators'
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BackendService {

  private endpoint = 'https://us-central1-pinoc-2019.cloudfunctions.net/getHarmony'

  presentations$: Observable<Presentation[]> = this.http.post(this.endpoint, { data: null })
    .pipe(
      map(data => data['result']),
      share()
    )

  rooms$: Observable<string[]> = this.presentations$
    .pipe(
      map(presentations => {
        let rooms = {}
        presentations.forEach(presentation => {
          rooms[presentation.room] = null
        })
        return Object.keys(rooms)
      })
    )

  constructor(private http: HttpClient) { }

}