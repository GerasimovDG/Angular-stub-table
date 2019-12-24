import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EditGuard } from "./edit.guard";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AddFormComponent } from "./view/students/stud-forms/add-form/add-form.component";
import { EditFormComponent } from "./view/students/stud-forms/edit-form/edit-form.component";
import { StudentsComponent } from "./view/students/students.component";

const routes: Routes = [
  { path: "", component: StudentsComponent },
  { path: "form", component: StudentsComponent, children: [
      { path: "add", component: AddFormComponent},
      { path: "edit", component: EditFormComponent,  redirectTo: "", pathMatch: "full"},
      { path: "edit/:id", component: EditFormComponent, canActivate: [EditGuard] },

    ]},
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
  ],
  exports: [RouterModule]
})


export class AppRoutingModule { }
