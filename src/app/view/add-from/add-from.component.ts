import { Component, OnInit } from "@angular/core";
import { BasicFormComponent } from "../basic-form/basic-form.component";

@Component({
  selector: "app-add-from",
  templateUrl: "./add-from.component.html",
  styleUrls: ["./add-from.component.less"]
})
export class AddFromComponent extends BasicFormComponent implements OnInit {

  ngOnInit(): void {
    super.ngOnInit();
  }

  submitStudent(): void {
    if (this.form.valid) {
      super.submitStudent();
      this.dataHandler.addStudent(this.newStudent);
      this.form.reset();
    }
  }
}
