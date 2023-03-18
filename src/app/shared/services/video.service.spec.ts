import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from "rxjs";
import { IProgress } from "../interfaces/progress";
import { VideoService } from "./video.service";

describe('VideoService', () => {
  let videoService: VideoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VideoService]
    });
    videoService = TestBed.inject(VideoService);
  });

  it('should create', () => {
    expect(videoService).toBeTruthy();
  });

  it('should set currentVideoUrl$', () => {
    const url = 'https://www.example.com';
    const seconds = 10;
    const expectedProgress: IProgress = { url, seconds };

    videoService.pinVideo(url, seconds);

    videoService.currentVideoUrl$.subscribe(progress => {
      expect(progress).toEqual(expectedProgress);
    });
  });

  it('should set currentVideoUrl$ to null if url is null', () => {
    const url = null;
    const expectedProgress: IProgress | null = null;

    videoService.pinVideo(url);

    videoService.currentVideoUrl$.subscribe(progress => {
      expect(progress).toEqual(expectedProgress);
    });
  });

  it('should increase speed video', () => {
    const initialSpeed = 1;
    const expectedSpeed = 1.1;

    videoService.speedVideo$ = new BehaviorSubject(initialSpeed);
    videoService.increaseSpeedVideo();

    videoService.speedVideo$.subscribe(speed => {
      expect(speed).toBe(expectedSpeed);
    });
  });

  it('should not increase speed video beyond max speed', () => {
    const initialSpeed = 10;
    const expectedSpeed = 10;

    videoService.speedVideo$ = new BehaviorSubject(initialSpeed);
    videoService.increaseSpeedVideo();

    videoService.speedVideo$.subscribe(speed => {
      expect(speed).toBe(expectedSpeed);
    });
  });

  it('should decrease speed video', () => {
    const initialSpeed = 1;
    const expectedSpeed = 0.9;

    videoService.speedVideo$ = new BehaviorSubject(initialSpeed);
    videoService.decreaseSpeedVideo();

    videoService.speedVideo$.subscribe(speed => {
      expect(speed).toBe(expectedSpeed);
    });
  });

  it('should not decrease speed video beyond min speed', () => {
    const initialSpeed = 0.1;
    const expectedSpeed = 0.1;

    videoService.speedVideo$ = new BehaviorSubject(initialSpeed);
    videoService.decreaseSpeedVideo();

    videoService.speedVideo$.subscribe(speed => {
      expect(speed).toBe(expectedSpeed);
    });
  });

  it('should round number to one decimal place', () => {
    const value1 = 1.234;
    const expectedValue1 = 1.2;
    const value2 = 3.456;
    const expectedValue2 = 3.5;

    expect(videoService.round(value1)).toBe(expectedValue1);
    expect(videoService.round(value2)).toBe(expectedValue2);
  });

});