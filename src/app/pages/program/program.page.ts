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

    this.events$ = this.backend.localPresentationsArray$
    this.rooms$ = this.backend.rooms$

  }

  presentationAction(id: string, favorite?: boolean) {
    if (favorite) {
      this.backend.unfavoritePresentation(id)
    } else {
      this.backend.favoritePresentation(id)
    }
  }

  showDetail(presentation: Presentation) {
    this.backend.showDetail(presentation)
  }

}