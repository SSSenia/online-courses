import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap, tap } from 'rxjs';
import { ICourse } from '../interfaces/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private courses: ICourse[] = [];

  constructor(
    private http: HttpClient
  ) { }

  public getCourses(courseId: string): Observable<ICourse> {
    console.log(document.pictureInPictureEnabled);

    let search = this.courses.find(value => value.id === courseId);
    if (search) return of(search);
    return this.http.get<{ token: string }>('https://api.wisey.app/api/v1/auth/anonymous?platform=subscriptions').pipe(
      switchMap((auth) => this.http.get<ICourse>(`https://api.wisey.app/api/v1/core/preview-courses/${courseId}?token=${auth.token}`)),
      tap(value => this.courses.push(value))
    );
  }
}
