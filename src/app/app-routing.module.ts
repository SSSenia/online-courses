import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  { path: '', redirectTo: '/courses/1', pathMatch: 'full' },
  { path: 'courses', loadChildren: () => import('./list-courses/list-courses.module').then(m => m.ListCoursesModule) },
  { path: 'course', loadChildren: () => import('./detailed-course/detailed-course.module').then(m => m.DetailedCourseModule) },
  { path: 'error/:error', component: ErrorComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
