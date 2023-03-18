import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProgress } from '../../interfaces/progress';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoComponent implements OnInit {

  public currentVideoUrl$!: BehaviorSubject<IProgress | null>;

  @Input()
  public poster!: string;

  @Input()
  public url!: string;

  constructor(
    private videoService: VideoService
  ) { }

  public ngOnInit(): void {
    this.currentVideoUrl$ = this.videoService.getCurrentVideoUrl();
  }

  public pictureInPicture(): void {
    if (this.videoService.getCurrentVideoUrl().getValue()?.url == this.url) this.videoService.pinVideo(null);
    else this.videoService.pinVideo(this.url);
  }

  public onKeyDown(e: any): void {
    if (e.keyCode == 0x6B)
      this.videoService.increaseSpeedVideo();
    if (e.keyCode == 0x6D)
      this.videoService.decreaseSpeedVideo();
  }

}
