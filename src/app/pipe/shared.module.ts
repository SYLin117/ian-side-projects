import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimePastPipe } from './time-past.pipe';



@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    CommonModule,
    TimePastPipe

  ],
  declarations: [
    TimePastPipe
  ],
  providers: [

  ],
})
export class PipeModule { }
