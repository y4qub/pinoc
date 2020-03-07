import { Component } from '@angular/core';
import { Presentation } from '../../interfaces/presentation.interface';
import { Observable } from 'rxjs';
import { BackendService } from '../../providers/backend.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-program',
  templateUrl: 'program.page.html',
  styleUrls: ['program.page.scss'],
})
export class ProgramPage {

  events: Presentation[]
  rooms: string[]

  constructor(private backend: BackendService, private localStorage: Storage) {

    this.backend.rooms$.subscribe(data => this.rooms = data)
    this.backend.presentations$.subscribe(data => this.events = data)

  }

  // savePresentation(presentation: Presentation) {
  //   this.localStorage.set(presentation.id, presentation)
  // }

}