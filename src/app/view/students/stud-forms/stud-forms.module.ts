import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddFormComponent } from "../add-form/add-form.component";
import { BasicFormComponent } from "../basic-form/basic-form.component";
import { EditFormComponent } from "../edit-form/edit-form.component";



@NgModule({
  declarations: [
    BasicFormComponent,
    AddFormComponent,
    EditFormComponent,
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
