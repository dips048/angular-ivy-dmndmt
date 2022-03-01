import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Widget } from '../../app-interfaces';

@Component({
  selector: 'app-widgets-list',
  templateUrl: './widgets-list.component.html',
  styleUrls: ['./widgets-list.component.css'],
})
export class WidgetsListComponent implements OnInit {
  @Input() widgets: Widget[];

  @Output() selected = new EventEmitter<Widget>();
  @Output() deleted = new EventEmitter<Widget>();

  constructor() {}

  ngOnInit() {}

  selectWidget(widget: Widget) {
    this.selected.emit(widget);
  }

  deleteWidget(widget: Widget) {
    this.deleted.emit(widget);
  }
}
