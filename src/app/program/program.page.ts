import { Component } from '@angular/core';
import { Presentation } from '../interfaces/presentation.interface.js';
import { Observable } from 'rxjs';
import { BackendService } from '../backend.service.js';

@Component({
  selector: 'app-program',
  templateUrl: 'program.page.html',
  styleUrls: ['program.page.scss'],
})
export class ProgramPage {

  events$: Observable<Presentation[]>
  rooms$: Observable<string[]>

  constructor(private backend: BackendService) {

    this.events$ = this.backend.getPresentations()
    this.rooms$ = this.backend.getRooms()

  }

}