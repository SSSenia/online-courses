import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { catchError, EMPTY, map, Observable, switchMap } from 'rxjs';
import { ICourse } from 'src/app/shared/interfaces/course';
import { ICourses } from 'src/app/shared/interfaces/courses';
import { CoursesService } from 'src/app/shared/services/courses.service';

const MAX_CARDS = 10;

@Component({
  selector: 'app-list-courses-layout',
  templateUrl: './list-courses-layout.component.html',
  styleUrls: ['./list-courses-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListCoursesLayoutComponent implements OnInit {

  public courses$!: Observable<ICourse[]>;
  public page: number = 1;
  public availablePages!: number[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coursesService: CoursesService
  ) { }

  public ngOnInit(): void {
    this.courses$ = this.route.params.pipe(
      switchMap((params: Params) => {
        this.page = params['page'];
        return this.coursesService.getCourses()
      }),
      map((courses: ICourses) => {
        this.calculateAvailablePages(courses.courses.length);
        const clippedCourses = courses.courses.slice((this.page - 1) * MAX_CARDS, this.page * MAX_CARDS);
        if (!+this.page || !clippedCourses.length)
          this.router.navigate(['/courses/1']);
        return clippedCourses;
      }),
      catchError((err) => {
        this.router.navigate(['/error', `${err.status} ${err.statusText}`])
        return EMPTY;
      }));
  }

  public calculateAvailablePages(length: number): void {
    const availableCount = Math.ceil(length / MAX_CARDS);
    this.availablePages = [];
    for (let i = 1; i <= availableCount; i++) {
      this.availablePages.push(i);
    }
  }
}
