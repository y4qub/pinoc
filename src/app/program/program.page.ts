import { Component } from '@angular/core';
import { Presentation } from '../interfaces/presentation.interface.js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-program',
  templateUrl: 'program.page.html',
  styleUrls: ['program.page.scss'],
})
export class ProgramPage {

    data: Array<Presentation>

  constructor(private http: HttpClient) {

    this.http.get('pinoc.cz/harmonogram.json').subscribe(console.log)

  }

}
