import { Component } from '@angular/core';
import { Presentation } from '../../interfaces/presentation.interface';
import { BackendService } from '../../providers/backend.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-program',
  templateUrl: 'program.page.html',
  styleUrls: ['program.page.scss'],
})
export class ProgramPage {

  events$: Observable<Presentation[]>
  rooms$: Observable<string[]>

  constructor(private backend: BackendService) {

    this.events$ = this.backend.presentations$
    this.rooms$ = this.backend.rooms$

  }

  // savePresentation(presentation: Presentation) {
  //   this.localStorage.set(presentation.id, presentation)
  // }

}