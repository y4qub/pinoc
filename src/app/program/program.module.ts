import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ProgramPage } from './program.page';
import { CalcTimePipe } from '../calc-time.pipe';
import { CalcLeftPixelShiftPipe } from '../calc-left-pixel-shift.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProgramPage
      }
    ])
  ],
  declarations: [ProgramPage, CalcTimePipe, CalcLeftPixelShiftPipe],
})
export class ProgramPageModule {}
