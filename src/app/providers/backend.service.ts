import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Presentation } from '../interfaces/presentation.interface';
import { map, share, first } from 'rxjs/operators'
import { Observable, Subject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx'

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
      presentations.forEach(presentation => {
        rooms[presentation.room] = null
      })
      return Object.keys(rooms)
    })
  )

  constructor(private http: HttpClient, private localStorage: Storage) {
    // this.http.post(this.endpoint, { data: null }).pipe(first()).toPromise().then(data => this.presentationSubject.next(data['result']))
  }

  // async savePresentations(data) {
  //   await this.localStorage.set('presentations', data)
  // }

  // favoritePresentation(id) {
  //   this.localNotification.schedule({id: id, text: })
  // }

}