import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailedCourseLayoutComponent } from './detailed-course-layout/detailed-course-layout.component';
import { CourseCardComponent } from './course-card/course-card.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    DetailedCourseLayoutComponent,
    CourseCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: ':courseId', component: DetailedCourseLayoutComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ])
  ]
})
export class DetailedCourseModule { }
