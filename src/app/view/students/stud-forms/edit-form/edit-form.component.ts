import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Student } from "../../../../model/students";
import { Data } from "../../../../service/data.service";
import { StudFormsComponent } from "../stud-forms.component";

@Component({
  selector: "app-edit-form",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./edit-form.component.html",
  styleUrls: ["./edit-form.component.less"]
})
export class EditFormComponent extends StudFormsComponent implements OnInit {

  editStudent: Student;

  constructor(protected mData: Data,
              protected route: ActivatedRoute,
              protected router: Router) {
    super(mData, route, router);
  }

  ngOnInit(): void {
    super.ngOnInit();

    const id = this.route.snapshot.params.id;
    console.dir(id);
    this.mData.getStudents().subscribe( (students) => {
      this.editStudent = students.find(student => student.id.toString() === id.toString());
      console.dir(this.editStudent);
      this.setEditStudent(this.editStudent);
    });

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
    this.form.patchValue({birthday: this.formatDate(new Date(student.birthday)) });
    this.form.patchValue({mark: student.averageMark});
  }

  closeEditForm(): void {
    this.router.navigate([""]);
  }

  submitEditStudent(): void {
    if (this.form.valid) {
      super.submitStudent();
      this.newStudent.id = this.editStudent.id;

      this.mData.editStudent(this.newStudent)
        .subscribe( () => {
          this.router.navigate([""]);
        });
    }
  }
}
