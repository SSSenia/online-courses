import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailedCourseLayoutComponent } from './detailed-course-layout/detailed-course-layout.component';
import { LessonCardComponent } from './lesson-card/lesson-card.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    DetailedCourseLayoutComponent,
    LessonCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: ':courseId', component: DetailedCourseLayoutComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ])
  ]
})
export class DetailedCourseModule { }
