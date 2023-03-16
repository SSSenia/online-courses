import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseCardComponent } from './course-card/course-card.component';
import { ListCoursesLayoutComponent } from './list-courses-layout/list-courses-layout.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CourseCardComponent,
    ListCoursesLayoutComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: ':page', component: ListCoursesLayoutComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ])
  ]
})
export class ListCoursesModule { }
