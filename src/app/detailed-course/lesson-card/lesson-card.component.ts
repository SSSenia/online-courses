import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ILesson } from 'src/app/shared/interfaces/lesson';

@Component({
  selector: 'app-lesson-card',
  templateUrl: './lesson-card.component.html',
  styleUrls: ['./lesson-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LessonCardComponent {

  @Input()
  public lesson!: ILesson;

}
