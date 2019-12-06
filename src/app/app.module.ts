import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { AddFromComponent } from "./view/add-from/add-from.component";
import { DeleteFormComponent } from "./view/delete-form/delete-form.component";
import { StudentsComponent } from "./view/students/students.component";

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    AddFromComponent,
    DeleteFormComponent,
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
