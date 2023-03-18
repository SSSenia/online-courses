import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { IProgress } from '../../interfaces/progress';
import { VideoService } from '../../services/video.service';
import { VideoInPictureComponent } from './video-in-picture.component';

describe('VideoInPictureComponent', () => {
  let component: VideoInPictureComponent;
  let fixture: ComponentFixture<VideoInPictureComponent>;
  let videoServiceSpy: jasmine.SpyObj<VideoService>;

  beforeEach(async () => {
    const videoService = jasmine.createSpyObj('VideoService', [
      'getCurrentVideoUrl',
      'pinVideo',
      'saveProgress',
      'increaseSpeedVideo',
      'decreaseSpeedVideo'
    ]);

    await TestBed.configureTestingModule({
      declarations: [VideoInPictureComponent],
      providers: [
        { provide: VideoService, useValue: videoService }
      ]
    })
      .compileComponents();

    videoServiceSpy = TestBed.inject(VideoService) as jasmine.SpyObj<VideoService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoInPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should ngOnInit set currentVideoUrl$ observable', () => {
    const currentVideoUrl$ = new BehaviorSubject<IProgress | null>(null);
    videoServiceSpy.getCurrentVideoUrl.and.returnValue(currentVideoUrl$);

    component.ngOnInit();

    expect(component.currentVideoUrl$).toEqual(currentVideoUrl$);
  });

  it('should unPin call pinVideo with null', () => {
    component.unPin();

    expect(videoServiceSpy.pinVideo).toHaveBeenCalledWith(null);
  });

  const url = 'https://example.com/video.mp4';

  it('should setCurrentTime call saveProgress with the url and current time', () => {
    const currentTime = 42;
    const event = { target: { currentTime } } as unknown as Event;

    component.setCurrentTime(event, url);

    expect(videoServiceSpy.saveProgress).toHaveBeenCalledWith(url, currentTime);
  });

  it('should setCurrentTime not call saveProgress if url is null', () => {
    const event = { target: { currentTime: 42 } } as unknown as Event;

    component.setCurrentTime(event, null);

    expect(videoServiceSpy.saveProgress).not.toHaveBeenCalled();
  });

  it('should onKeyDown call increaseSpeedVideo when keyCode is 0x6B', () => {
    const event = { keyCode: 0x6B };

    component.onKeyDown(event);

    expect(videoServiceSpy.increaseSpeedVideo).toHaveBeenCalled();
    expect(videoServiceSpy.decreaseSpeedVideo).not.toHaveBeenCalled();
  });

  it('should onKeyDown call decreaseSpeedVideo when keyCode is 0x6D', () => {
    const event = { keyCode: 0x6D };

    component.onKeyDown(event);

    expect(videoServiceSpy.decreaseSpeedVideo).toHaveBeenCalled();
    expect(videoServiceSpy.increaseSpeedVideo).not.toHaveBeenCalled();
  });
});
