import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Widget } from '../app-interfaces';
import { WidgetsService } from './widgets.service';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.css'],
})
export class WidgetsComponent implements OnInit {
  widgets$: Observable<Widget[]>;
  widgetForm: FormGroup;
  selectedWidget: Widget;

  constructor(private widgetService: WidgetsService, private fb: FormBuilder) {}

  ngOnInit() {
    this.loadWidgets();
    this.widgetForm = this.fb.group({
      id: [],
      title: [],
      description: [],
      email: [
        '',
        [Validators.pattern('[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
      ],
    });
  }

  loadWidgets() {
    this.widgets$ = this.widgetService.findAll();
  }

  saveWidget(widget: Widget) {
    if (widget.id) {
      this.updateWidget(widget);
    } else {
      this.createWidget(widget);
    }
  }

  reset() {
    this.loadWidgets();
    this.resetForm();
    // this.selectWidget(null);
  }

  resetForm() {
    this.widgetForm.reset();
    // this.selectWidget(null);
  }

  selectWidget(widget: Widget) {
    this.widgetService.findOne(widget?.id).subscribe();
  }

  createWidget(widget: Widget) {
    this.widgetService.create(widget).subscribe({
      complete: () => {
        this.reset();
      },
      error: (err) => {
        if (err.message === 'E001') {
          this.widgetForm.get('email').setErrors({ exist: true });
        }
        console.log('saveWidget error', err.message);
      },
    });
  }

  updateWidget(widget: Widget) {
    this.widgetService.update(widget, widget.id).subscribe({
      complete: () => {
        this.reset();
      },
      error: (err) => {
        if (err.message === 'E001') {
          this.widgetForm.get('email').setErrors({ exist: true });
        }
        console.log('saveWidget error', err.message);
      },
    });
  }

  deleteWidget(widget: Widget) {
    this.widgetService.delete(widget).subscribe(() => this.reset());
  }

  onSelected(widget: Widget) {
    this.selectedWidget = widget;
  }
}
