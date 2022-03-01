import { Injectable } from '@angular/core';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import { Widget } from '../app-interfaces';

@Injectable({ providedIn: 'root' })
export class WidgetsService {
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
    {
      id: '3',
      title: 'title_3',
      description: 'desc_3',
      email: 'email_3@p.com',
    },
    {
      id: '4',
      title: 'title_4',
      description: 'desc_4',
      email: 'email_4@p.com',
    },
  ];

  findAll() {
    return of(this.widgets);
  }

  findOne(id) {
    return of(this.widgets.find((w) => w.id === id));
  }

  create(widget: Widget): Observable<any> {
    let existingWidget = this.widgets.find((w) => w.email === widget.email);
    if (!!existingWidget) {
      return throwError(() => new Error(`E001`));
    } else {
      widget.id = (this.widgets.length + 1).toString();
      this.widgets.push(widget);
      return EMPTY;
    }
  }

  update(widget: Widget, id: string) {
    const index = this.widgets.findIndex((w) => w.email === widget.email)
    let existingWidget = this.widgets.find((w,i) => w.email === widget.email && (i != index));
    if (!!existingWidget) {
      return throwError(() => new Error(`E001`));
    } else {
      this.widgets = this.widgets.map((w) => (w.id === id ? widget : w));
      return EMPTY;
    }
  }

  delete(widget: Widget) {
    this.widgets = this.widgets.filter((w) => w.email !== widget.email);
    return of(this.widgets);
  }
}
