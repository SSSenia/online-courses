import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProgress } from '../../interfaces/progress';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-video-in-picture',
  templateUrl: './video-in-picture.component.html',
  styleUrls: ['./video-in-picture.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoInPictureComponent implements OnInit {

  public currentVideoUrl$!: BehaviorSubject<IProgress | null>;
  public videoElement!: HTMLVideoElement;

  @ViewChild('videoPlayer')
  public videoElementRef!: ElementRef;

  constructor(
    private videoService: VideoService
  ) { }


  public ngOnInit(): void {
    this.currentVideoUrl$ = this.videoService.getCurrentVideoUrl();
  }

  public unPin(): void {
    this.videoService.pinVideo(null);
  }

  public setCurrentTime(data: Event, url: string | null): void {
    if (url) {
      const currentTime = (data.target as HTMLVideoElement).currentTime;
      this.videoService.saveProgress(url, currentTime);
    }
  }

  public onKeyDown(e: any): void {
    if (e.keyCode == 0x6B)
      this.videoService.increaseSpeedVideo();
    if (e.keyCode == 0x6D)
      this.videoService.decreaseSpeedVideo();
  }
}
