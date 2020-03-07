import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Presentation } from '../interfaces/presentation.interface';
import { map, share, first } from 'rxjs/operators'
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BackendService {

  private endpoint = 'https://us-central1-pinoc-2019.cloudfunctions.net/getHarmony'

  // presentationSubject: Subject<Presentation[]> = new Subject

  presentations$: Observable<Presentation[]> = this.http.post(this.endpoint, { data: null })
    .pipe(
      map(data => data['result']),
      share()
    )

  rooms$: Observable<string[]> = this.presentations$.pipe(
    map(presentations => {
      let rooms = {}
      presentations.forEach(presentation => rooms[presentation.room] = null)
      return Object.keys(rooms)
    })
  )

  constructor(private http: HttpClient) {
    // this.http.post(this.endpoint, { data: null }).pipe(first()).toPromise().then(data => this.presentationSubject.next(data['result']))
  }


}

const translation = {
  201: 'Přednáškovna 1 (201)',
  204: 'Přednáškovna 2 (204)',
  206: 'Přednáškovna 3 (206)',
  207: 'Přednáškovna 4 (207)',
  208: 'Přednáškovna 5 (208)',
  FOOD: 'Jídelna',
  FRONT: 'Vestibul',
  SPORT: 'Šatny u horní tělocvičny',
  ART: 'Ateliér'
}