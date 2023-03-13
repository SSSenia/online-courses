import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICourses } from 'src/app/shared/interfaces/courses';
import { CoursesService } from 'src/app/shared/services/courses.service';

@Component({
  selector: 'app-list-courses-layout',
  templateUrl: './list-courses-layout.component.html',
  styleUrls: ['./list-courses-layout.component.scss']
})
export class ListCoursesLayoutComponent implements OnInit {

  public courses$!: Observable<ICourses>;

  constructor(
    private coursesService: CoursesService
  ) { }

  public ngOnInit(): void {
    this.courses$ = this.coursesService.getCourses();
  }
}
