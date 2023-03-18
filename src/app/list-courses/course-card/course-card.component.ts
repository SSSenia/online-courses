import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ICourse } from 'src/app/shared/interfaces/course';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseCardComponent {

  @Input()
  public course!: ICourse;

  public hover = false;
  public isLoading = true;

  public mouseEnter() {
    this.hover = true;
    console.log('enter', this.course);
  }

  public mouseLeave() {
    this.hover = false;
    console.log('leave', this.course);
  }

}
