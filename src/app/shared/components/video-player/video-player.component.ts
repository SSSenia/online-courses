import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { VideoService } from '../../services/video.service';
import Hls from 'hls.js';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoPlayerComponent implements AfterViewInit {

  public videoElement!: HTMLVideoElement;
  public loaded = false;

  @Input()
  public poster!: string;

  @Input()
  public url!: string;

  @Input()
  public currentTime: number = 0;

  @Input()
  public preview: boolean = false;

  @Input()
  public straight: 'bottom' | undefined;

  @ViewChild('videoPlayer')
  public videoElementRef!: ElementRef;

  constructor(
    private videoService: VideoService
  ) { }

  ngAfterViewInit(): void {
    this.videoElement = this.videoElementRef?.nativeElement;

    if (Hls.isSupported() && this.url) {
      var hls = new Hls();
      hls.loadSource(this.url);
      hls.attachMedia(this.videoElement);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        this.loaded = true;
        if (this.preview) this.videoElement.play();
        else this.videoElement.pause();
        this.videoElement.currentTime = this.currentTime;
      });
    }
    else if (this.videoElement.canPlayType('application/vnd.apple.mpegurl')) {
      this.loaded = true;
      this.videoElement.src = this.url;
      if (this.preview) this.videoElement.play();
      else this.videoElement.pause();
      this.videoElement.currentTime = this.currentTime;
    }
  }

  public setCurrentTime(data: Event): void {
    this.currentTime = (data.target as HTMLVideoElement).currentTime;
    if (this.currentTime && !this.preview) this.videoService.saveProgress(this.url, this.currentTime);
  }
}
