import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Widget } from '../app-interfaces';

@Injectable({ providedIn: 'root' })
export class WidgetsService {
  emailAlredyExistError$: Observable<string>;
  widgets$: Observable<Widget[]>;
  widgets: Widget[] = [
    {
      id: '1',
      title: 'title_1',
      description: 'desc_1',
      email: 'email_1@p.com',
    },
    {
      id: '2',
      title: 'title_2',
      description: 'desc_2',
      email: 'email_2@p.com',
    },
    // {
    //   id: '3',
    //   title: 'title_3',
    //   description: 'desc_3',
    //   email: 'email_3@p.com',
    // },
    // {
    //   id: '4',
    //   title: 'title_4',
    //   description: 'desc_4',
    //   email: 'email_4@p.com',
    // },
  ];

  constructor() {
    this.widgets$ = of(this.widgets);
  }

  findAll() {
    return this.widgets$;
  }

  findOne(id) {
    return this.widgets$.pipe(
      map((widgets) => widgets.find((w) => w.id === id))
    );
  }

  create(widget: Widget) {
    this.widgets$ = this.checkDublicateEmail(widget.email).pipe(
      map((widgets) => {
        widgets.push(widget);
        return widgets;
      })
    );
    return this.widgets$;
  }

  update(widget: Widget, id: string) {
    this.widgets$ = this.widgets$.pipe(
      map((widgets) => widgets.map((w) => (w.id === id ? widget : w)))
    );
    return this.widgets$;
  }

  checkDublicateEmail(value: string): Observable<Widget[]> {
    return this.widgets$.pipe(
      map((widgets) => {
        const i = widgets.findIndex((widget) => widget.email === value);
        if (i >= 0) {
          this.emailAlredyExistError$ = of(`"${value}" email Aready Exist`);
          throw new Error('Email Aready Exist');
        }
        return widgets;
      })
    );
  }
}
