import { HttpTestingController, HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { ICourse } from "../interfaces/course";
import { CourseService } from "./course.service";

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CourseService]
    });

    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  const courseId = 'course-123';
  const course: ICourse = {
    id: 'course-123',
    title: 'Test Course',
    tags: ['test', 'course'],
    launchDate: new Date(),
    status: 'active',
    description: 'This is a test course',
    duration: 3600,
    lessonsCount: 10,
    previewImageLink: 'https://example.com/preview-image.jpg',
    rating: 4.5,
    meta: {
      slug: 'test-course',
      skills: ['skill1', 'skill2'],
      courseVideoPreview: {
        link: 'https://example.com/course-preview.mp4',
        duration: 60,
        previewImageLink: 'https://example.com/preview-image.jpg'
      }
    },
    lessons: [{
      id: 'lesson-1',
      title: 'Lesson 1',
      duration: 300,
      order: 1,
      type: 'video',
      status: 'unlocked',
      link: 'https://example.com/lesson-1.mp4',
      previewImageLink: 'https://example.com/preview-image.jpg',
      meta: null
    }]
  };

  it('should make an API request and return the course', () => {
    service.getCourses(courseId).subscribe(c => {
      expect(c).toEqual(course);
    });

    const req1 = httpMock.expectOne(`https://api.wisey.app/api/v1/auth/anonymous?platform=subscriptions`);
    expect(req1.request.method).toBe('GET');

    req1.flush({ token: 'test-token' });

    const req2 = httpMock.expectOne(`https://api.wisey.app/api/v1/core/preview-courses/${courseId}?token=test-token`);
    expect(req2.request.method).toBe('GET');

    req2.flush(course);

    expect(service['courses']).toEqual([course]);
  })
});
