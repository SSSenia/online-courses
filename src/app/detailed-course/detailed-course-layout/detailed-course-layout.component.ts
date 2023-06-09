import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BehaviorSubject, catchError, EMPTY, Observable, switchMap } from 'rxjs';
import { ICourse } from 'src/app/shared/interfaces/course';
import { CourseService } from 'src/app/shared/services/course.service';
import { VideoService } from 'src/app/shared/services/video.service';

@Component({
  selector: 'app-detailed-course-layout',
  templateUrl: './detailed-course-layout.component.html',
  styleUrls: ['./detailed-course-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailedCourseLayoutComponent implements OnInit {

  public course$!: Observable<ICourse>;
  public speed$!: BehaviorSubject<number>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private videoService: VideoService
  ) { }

  public ngOnInit(): void {
    this.speed$ = this.videoService.getSpeedVideo();
    this.course$ = this.route.params.pipe(
      switchMap((params: Params) => this.courseService.getCourses(params['courseId'])),
      catchError((err) => {
        this.router.navigate(['/error', `${err.status} ${err.statusText}`])
        return EMPTY;
      }));
  }

}
