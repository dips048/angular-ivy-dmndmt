import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Widget } from '../../app-interfaces';

@Component({
  selector: 'app-widget-details',
  templateUrl: './widget-details.component.html',
  styleUrls: ['./widget-details.component.css'],
})
export class WidgetDetailsComponent implements OnInit {

  currentWidget: Widget;

  @Input() widgetForm: FormGroup;
  @Input() set widget(val: Widget) {
    console.log('val', val);
    this.currentWidget = { ...val };
    if (val) {
      this.widgetForm.setValue({ ...val });
    }
  }
  @Input() widgetVal: Widget;

  @Output() saved = new EventEmitter<Widget>();
  @Output() canceled = new EventEmitter();
  @Output() delete = new EventEmitter<Widget>();

  constructor() {}

  SubmitWidget(widget: Widget) {
    console.log('SubmitWidget', widget);
    this.saved.emit(widget);
  }

  ngOnInit() {}
}
