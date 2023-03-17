import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProgress, IProgressData } from '../interfaces/progress';

const MAX_SPEED = 10;
const MIN_SPEED = 0.1;
const STEP_SPEED = 0.1;

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  public currentVideoUrl$: BehaviorSubject<IProgress | null> = new BehaviorSubject<IProgress | null>(null);
  public speedVideo$: BehaviorSubject<number> = new BehaviorSubject(1);

  public localData: IProgressData = { data: [] };

  constructor() {
    const unparsed = localStorage.getItem('progressData');
    if (unparsed) this.localData = JSON.parse(unparsed);
  }

  public getCurrentVideoUrl(): BehaviorSubject<IProgress | null> {
    return this.currentVideoUrl$;
  }

  public getSpeedVideo(): BehaviorSubject<number> {
    return this.speedVideo$;
  }

  public pinVideo(url: string | null, seconds: number = 0) {
    this.currentVideoUrl$.next(url ? { url, seconds } : null);
  }

  public saveProgress(url: string, seconds: number): void {
    const exist = this.localData.data.find(x => x.url === url);
    if (exist) exist.seconds = seconds;
    else this.localData.data.push({ url, seconds });

    localStorage.setItem('progressData', JSON.stringify(this.localData));
  }

  public increaseSpeedVideo(): void {
    const currentSpeed = this.speedVideo$.getValue();
    if (currentSpeed < MAX_SPEED) this.speedVideo$.next(this.round(currentSpeed + STEP_SPEED));
  }

  public decreaseSpeedVideo(): void {
    const currentSpeed = this.speedVideo$.getValue();
    if (currentSpeed > MIN_SPEED) this.speedVideo$.next(this.round(currentSpeed - STEP_SPEED));
  }

  public round(value: number): number {
    return Math.round(value * 10) / 10;
  }
}
