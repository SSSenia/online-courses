import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { VideoService } from '../services/video.service';

@Directive({
  selector: 'video'
})
export class VideoSpeedDirective implements OnInit, OnDestroy {

  private sub$!: Subscription;

  constructor(
    private elementRef: ElementRef,
    private videoService: VideoService
  ) { }

  public ngOnInit(): void {
    this.elementRef.nativeElement.playbackRate = this.videoService.getSpeedVideo().getValue();
    this.sub$ = this.videoService.getSpeedVideo()
      .subscribe(speed => this.elementRef.nativeElement.playbackRate = speed);
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
}
