import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Student } from "../../model/students";
import { BasicFormComponent } from "../basic-form/basic-form.component";

@Component({
  selector: "app-edit-form",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./edit-form.component.html",
  styleUrls: ["./edit-form.component.less"]
})
export class EditFormComponent extends BasicFormComponent implements OnInit {

  ngOnInit(): void {
    super.ngOnInit();
    this.setEditStudent(this.dataHandler.student);
  }


  formatDate(date: Date): string {
    const year = date.getFullYear();
    let MM: string = (date.getMonth() + 1) + "";
    let dd: string = "" + date.getDate();
    if (MM.length < 2) {
      MM = "0" + MM;
    }
    if (dd.length < 2) {
      dd = "0" + dd;
    }
    return [year, MM, dd].join("-");
  }

  setEditStudent(student: Student): void {
    this.form.patchValue({fio: student});
    this.form.patchValue({birthday: this.formatDate(student.birthday)  });
    this.form.patchValue({mark: student.averageMark});
  }

  submitEditStudent(): void {
    if (this.form.valid) {
      super.submitStudent();
      this.newStudent.id = this.dataHandler.student.id;
      this.dataHandler.editStudent(this.newStudent);
      this.dataHandler.isCallEditFormService = false;
      this.dataHandler.toggleForUpdate = !this.dataHandler.toggleForUpdate;
    }
  }
}
