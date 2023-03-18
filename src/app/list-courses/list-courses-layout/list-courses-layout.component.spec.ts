import { ListCoursesLayoutComponent } from "./list-courses-layout.component";

describe('ListCoursesLayoutComponent', () => {
  let component: ListCoursesLayoutComponent;

  beforeEach(() => {
    component = new ListCoursesLayoutComponent(null!, null!, null!);
  });

  it('should calculate available pages correctly', () => {
    component.calculateAvailablePages(12);
    expect(component.availablePages).toEqual([1, 2]);

    component.calculateAvailablePages(10);
    expect(component.availablePages).toEqual([1]);

    component.calculateAvailablePages(0);
    expect(component.availablePages).toEqual([]);
  });
});