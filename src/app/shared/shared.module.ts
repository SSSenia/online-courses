import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';
import { DurationPipe } from './pipes/duration.pipe';



@NgModule({
  declarations: [
    LoadingComponent,
    DurationPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingComponent,
    DurationPipe
  ]
})
export class SharedModule { }
