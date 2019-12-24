import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HighlightDirective } from "../../directives/highlight.directive";
import { InfoDirective } from "../../directives/info.directive";
import { DateYearsPipe } from "../../pipes/date-years.pipe";
import { FilterPipe } from "../../pipes/filter.pipe";
import { FormatMarkPipe } from "../../pipes/format-mark.pipe";
import { GoodMarkPipe } from "../../pipes/good-mark.pipe";
import { StudFormsModule } from "./stud-forms/stud-forms.module";
import { StudentsComponent } from "./students.component";



@NgModule({
  declarations: [
    StudentsComponent,
    FilterPipe,
    FormatMarkPipe,
    DateYearsPipe,
    GoodMarkPipe,
    HighlightDirective,
    InfoDirective,
  ],
  exports: [
    StudentsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    StudFormsModule,
    RouterModule,
  ],
  providers: []
})
export class StudentsModule { }
