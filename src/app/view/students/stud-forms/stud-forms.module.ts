import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddFormComponent } from "./add-form/add-form.component";
import { EditFormComponent } from "./edit-form/edit-form.component";
import { StudFormsComponent } from "./stud-forms.component";


@NgModule({
  declarations: [
    AddFormComponent,
    EditFormComponent,
    StudFormsComponent,
  ],
  exports: [
    AddFormComponent,
    EditFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class StudFormsModule { }
