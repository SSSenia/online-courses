import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { path: 'courses', loadChildren: () => import('./list-courses/list-courses.module').then(m => m.ListCoursesModule) },
  { path: 'course', loadChildren: () => import('./detailed-course/detailed-course.module').then(m => m.DetailedCourseModule) },
  { path: '**', redirectTo: '/courses' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
