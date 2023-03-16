import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { ICourse } from 'src/app/shared/interfaces/course';
import { CourseService } from 'src/app/shared/services/course.service';

@Component({
  selector: 'app-detailed-course-layout',
  templateUrl: './detailed-course-layout.component.html',
  styleUrls: ['./detailed-course-layout.component.scss']
})
export class DetailedCourseLayoutComponent implements OnInit{

  public course$!: Observable<ICourse>;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ){}

  public ngOnInit(): void {
    this.course$ = this.route.params.pipe(
      switchMap((params: Params)=>this.courseService.getCourses(params['courseId'])));
    
  }

}
