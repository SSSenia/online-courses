import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap, tap } from 'rxjs';
import { ICourses } from '../interfaces/courses';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private courses!: ICourses;

  constructor(
    private http: HttpClient
  ) { }

  public getCourses(): Observable<ICourses> {
    if (this.courses) return of(this.courses);
    return this.http.get<{ token: string }>('https://api.wisey.app/api/v1/auth/anonymous?platform=subscriptions').pipe(
      switchMap((auth) => this.http.get<ICourses>(`https://api.wisey.app/api/v1/core/preview-courses?token=${auth.token}`)),
      tap(value => this.courses = value)
    );
  }
}
