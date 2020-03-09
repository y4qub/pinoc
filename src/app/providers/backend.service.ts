import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Presentation } from '../interfaces/presentation.interface';
import { map, share, first } from 'rxjs/operators'
import { Observable, Subject } from 'rxjs';
import { Storage } from '@ionic/storage'
import { ModalController } from '@ionic/angular';
import { PresentationDetailPage } from '../pages/presentation-detail/presentation-detail.page';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

const endpoint = 'https://us-central1-pinoc-2019.cloudfunctions.net/getHarmony'

interface Presentations { [key: string]: Presentation }

@Injectable({ providedIn: 'root' })
export class BackendService {

  presentations$: Observable<Presentation[]> = this.http.post(endpoint, { data: null })
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

  localPresentations$: Subject<Presentations> = new Subject()
  localPresentationsArray$ = this.localPresentations$.pipe(map(data => this.transformPresToArr(data)))

  constructor(
    private http: HttpClient,
    private localStorage: Storage,
    private modalController: ModalController,
    private localNotifications: LocalNotifications) {
    this.initSave().then(async () => {
      const pres = await this.loadPresentations()
      this.localPresentations$.next(pres)
    })
  }

  private async scheduleNotification(afterMidnight: boolean, h: number, m: number, presId: string) {
    const notId = parseInt(`${h}${m}`)
    const pres = await this.loadPresentations()
    pres[presId].notificationId = notId
    this.savePresentations(pres)
    this.localNotifications.schedule({ trigger: { at: new Date(2020, 3, afterMidnight ? 14 : 13, h, m) }, id: notId})
  }

  private async unscheduleNotification(presId: string) {
    const pres = await this.loadPresentations()
    const notId = pres[presId].notificationId
    return this.localNotifications.cancel(notId)
  }

  private async initSave() {
    const data = await this.localStorage.get('presentations')
    if (!data) {
      const presentationsArr = await this.presentations$.pipe(first()).toPromise()
      const presObj = this.transformPresToObj(presentationsArr)
      await this.savePresentations(presObj)
    }
  }

  async showDetail(presentation: Presentation) {
    const modal = await this.modalController.create({
      component: PresentationDetailPage, componentProps: { presentation }
    })
    return modal.present()
  }

  async favoritePresentation(presId: string) {
    const presentations = await this.loadPresentations()
    presentations[presId].favorite = true
    await this.savePresentations(presentations)
    const h = parseInt(presentations[presId].time.split(':')[0])
    const m = parseInt(presentations[presId].time.split(':')[1])
    await this.scheduleNotification(h < 12, h, m, presId)
  }

  async unfavoritePresentation(presId: string) {
    const presentations = await this.loadPresentations()
    presentations[presId].favorite = false
    await this.savePresentations(presentations)
    await this.unscheduleNotification(presId)
  }

  private async savePresentations(presentations) {
    const data = await this.localStorage.set('presentations', presentations)
    this.localPresentations$.next(presentations)
    return data
  }

  private transformPresToObj(presentations: Presentation[]) {
    const presObj: Presentations = {}
    presentations.forEach(presentation => {
      presObj[presentation.id] = presentation
    })
    return presObj
  }

  private transformPresToArr(presentations): Presentation[] {
    return Object.values(presentations)
  }

  private loadPresentations(): Promise<Presentations> {
    return this.localStorage.get('presentations')
  }

  async loadPresentationsArray() {
    const presObj = await this.loadPresentations()
    return Object.values(presObj)
  }

}