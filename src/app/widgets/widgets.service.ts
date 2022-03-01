import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Widget } from '../app-interfaces';

@Injectable({ providedIn: 'root' })
export class WidgetsService {
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

  constructor() {}

  findAll() {
    return of(this.widgets);
  }

  findOne(id) {
    return of(this.widgets.filter((w) => w.id === id));
  }

  create(widget: Widget) {
    let existingWidget = this.widgets.find((w) => w.email === widget.email);
    if (!!existingWidget) {
      throw 'email exists';
    } else {
      this.widgets.push(widget);
    }
  }

  update(widget: Widget, id: string) {
    return of(this.widgets.map((w) => (w.id === id ? this.widgets : w)));
  }
}
