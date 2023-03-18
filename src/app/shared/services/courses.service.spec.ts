import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ICourses } from '../interfaces/courses';
import { CoursesService } from './courses.service';

describe('CoursesService', () => {
  let service: CoursesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoursesService]
    });

    service = TestBed.inject(CoursesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should make two http requests and return courses', () => {
    const mockAuth = { token: 'mockToken' };
    const mockCourses: ICourses = { courses: [] };

    service.getCourses().subscribe(courses => {
      expect(courses).toEqual(mockCourses);
    });

    const authReq = httpMock.expectOne('https://api.wisey.app/api/v1/auth/anonymous?platform=subscriptions');
    expect(authReq.request.method).toEqual('GET');
    authReq.flush(mockAuth);

    const coursesReq = httpMock.expectOne(`https://api.wisey.app/api/v1/core/preview-courses?token=${mockAuth.token}`);
    expect(coursesReq.request.method).toEqual('GET');
    coursesReq.flush(mockCourses);
  });

});
