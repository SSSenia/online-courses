import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor() {}

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const updateReq = request.clone({
      params: (request.params ? request.params : new HttpParams())
                 .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzZmRkOTg1MS0zOGY3LTRjMDktYTI4MS1jYjU0MGU4N2Q1MWUiLCJlbWFpbCI6InF6c29yeG9odmhld3l0Z3FidUBiYml0Zi5jb20iLCJmaXJzdE5hbWUiOiJUZXN0IiwicGxhdGZvcm0iOiJzdWJzY3JpcHRpb25zIiwiYXV0aFR5cGVzIjpbIm9yZGluYXJ5Il0sImlhdCI6MTY3ODczNDA2NywiZXhwIjoxNzY1MTM0MDY3fQ.oLi5DEEz3h-JhlChyZnzXxAw1P5UbTqP2XMx2URqYVQ')
    });
    return next.handle(updateReq);
  }
}
