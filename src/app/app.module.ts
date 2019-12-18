import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { HighlightDirective } from "./directives/highlight.directive";
import { InfoDirective } from "./directives/info.directive";
import { DateYearsPipe } from "./pipes/date-years.pipe";
import { FilterPipe } from "./pipes/filter.pipe";
import { FormatMarkPipe } from "./pipes/format-mark.pipe";
import { GoodMarkPipe } from "./pipes/good-mark.pipe";
import { AddFromComponent } from "./view/add-from/add-from.component";
import { BasicFormComponent } from "./view/basic-form/basic-form.component";
import { EditFormComponent } from "./view/edit-form/edit-form.component";
import { StudentsComponent } from "./view/students/students.component";

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    AddFromComponent,
    EditFormComponent,
    BasicFormComponent,
    FilterPipe,
    FormatMarkPipe,
    DateYearsPipe,
    GoodMarkPipe,
    HighlightDirective,
    InfoDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
