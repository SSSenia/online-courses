import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingComponent } from './components/loading/loading.component';
import { DurationPipe } from './pipes/duration.pipe';
import { VideoComponent } from './components/video/video.component';
import { StartTimePipe } from './pipes/start-time.pipe';
import { VideoSpeedDirective } from './directives/video-speed.directive';
import { VideoInPictureComponent } from './components/video-in-picture/video-in-picture.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';



@NgModule({
  declarations: [
    LoadingComponent,
    DurationPipe,
    VideoComponent,
    StartTimePipe,
    VideoSpeedDirective,
    VideoInPictureComponent,
    VideoPlayerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingComponent,
    DurationPipe,
    VideoComponent,
    VideoInPictureComponent,
    VideoPlayerComponent,
    StartTimePipe
  ]
})
export class SharedModule { }
