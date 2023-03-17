import { Pipe, PipeTransform } from '@angular/core';
import { VideoService } from '../services/video.service';

@Pipe({
  name: 'startTime'
})
export class StartTimePipe implements PipeTransform {

  constructor(
    private videoService: VideoService
  ) { }

  transform(url: string): number {
    let seconds: undefined | number = this.videoService.localData.data.find(x=> x.url === url)?.seconds;
    return seconds ? Math.floor(seconds) : 0;
  }

}
