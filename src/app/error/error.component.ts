import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorComponent implements OnInit {

  public error$!: Observable<string>;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.error$ = this.route.params.pipe(
      map((value: Params) => value['error'])
    );
  }

}
