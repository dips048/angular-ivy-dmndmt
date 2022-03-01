import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Widget } from '../../app-interfaces';
import { WidgetsService } from '../widgets.service';

@Component({
  selector: 'app-widget-details',
  templateUrl: './widget-details.component.html',
  styleUrls: ['./widget-details.component.css'],
})
export class WidgetDetailsComponent implements OnInit {
  currentWidget: Widget;
  originalTitle: string;
  widgetForm: FormGroup;
  emailAlredyExistError$: Observable<string>;

  @Input() errorMessage: string;
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

  constructor(private fb: FormBuilder, private widgetService: WidgetsService) {}

  SubmitWidget(widget: Widget) {
    // console.log('SubmitWidget', widget);
    this.saved.emit(widget);
  }

  ngOnInit() {
    this.emailAlredyExistError$ = this.widgetService.emailAlredyExistError$;
    this.widgetForm = this.fb.group({
      id: [],
      title: [],
      description: [''],
      email: [
        '',
        [Validators.pattern('[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
      ],
    });
  }
}
