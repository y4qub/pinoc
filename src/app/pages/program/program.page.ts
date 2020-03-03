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

  events$: Observable<Presentation[]>
  rooms$: Observable<string[]>

  constructor(private backend: BackendService, private localStorage: Storage) {

    this.events$ = this.backend.getPresentations()
    this.rooms$ = this.backend.getRooms()

  }

  // savePresentation(presentation: Presentation) {

  //   this.localStorage.set(presentation.id, presentation)

  // }

}