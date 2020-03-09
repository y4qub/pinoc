import { Component, Input } from '@angular/core';
import { Presentation } from '../../interfaces/presentation.interface';
import { BackendService } from '../../providers/backend.service';

@Component({
  selector: 'app-presentation-detail',
  templateUrl: 'presentation-detail.page.html',
  styleUrls: ['presentation-detail.page.scss'],
})
export class PresentationDetailPage {

  @Input() presentation: Presentation;

  constructor(private backend: BackendService) {

  }

  presentationAction(id: string, favorite?: boolean) {
    if (favorite) {
      this.backend.unfavoritePresentation(id)
    } else {
      this.backend.favoritePresentation(id)
    }
  }

}