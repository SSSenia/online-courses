import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
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
    let search = this.courses.find(value => value.id === courseId);
    if (search) return of(search);
    return this.http.get<ICourse>(`http://api.wisey.app/api/v1/core/preview-courses/${courseId}`)
      .pipe(tap(value => this.courses.push(value)));
  }
}
