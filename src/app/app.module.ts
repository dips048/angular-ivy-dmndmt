import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { WidgetsComponent } from './widgets/widgets.component';
import { WidgetsListComponent } from './widgets/widgets-list/widgets-list.component';
import { WidgetDetailsComponent } from './widgets/widget-details/widget-details.component';
import { MaterialModule } from './material/material.module';

@NgModule({
  imports: [BrowserModule, FormsModule, MaterialModule, ReactiveFormsModule],
  declarations: [
    AppComponent,
    HelloComponent,
    WidgetsComponent,
    WidgetsListComponent,
    WidgetDetailsComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
