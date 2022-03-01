import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Widget } from '../../app-interfaces';

@Component({
  selector: 'app-widget-details',
  templateUrl: './widget-details.component.html',
  styleUrls: ['./widget-details.component.css'],
})
export class WidgetDetailsComponent implements OnInit {
  currentWidget: Widget;
  originalTitle: string;
  widgetForm: FormGroup;

  @Input() set widget(val: Widget) {
    console.log('val', val);
    this.currentWidget = { ...val };
    this.widgetForm.setValue(val);
  }

  @Output() saved = new EventEmitter<Widget>();
  @Output() canceled = new EventEmitter();

  constructor(private fb: FormBuilder) {}

  SubmitWidget(widget: Widget) {
    // console.log('SubmitWidget', widget);
    this.saved.emit(widget);
  }

  ngOnInit() {
    this.widgetForm = this.fb.group({
      title: [],
      description: [''],
      email: [
        '',
        [Validators.pattern('[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
      ],
    });
  }
}
