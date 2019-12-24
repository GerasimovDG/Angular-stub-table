import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Student } from "../../../../model/students";
import { DataHandlerService } from "../../../../service/data-handler.service";
import { StudFormsComponent } from "../stud-forms.component";

@Component({
  selector: "app-edit-form",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./edit-form.component.html",
  styleUrls: ["./edit-form.component.less"]
})
export class EditFormComponent extends StudFormsComponent implements OnInit {

  @Input() editStudent: Student;

  @Output() onEdit: EventEmitter<boolean> = new EventEmitter<boolean>();
  private isCallEditForm: boolean;

  constructor(protected dataHandler: DataHandlerService, protected route: ActivatedRoute, private router: Router) {
    super(dataHandler, route);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.route.params.subscribe( (params: Params) => {
      console.dir(params);
      this.editStudent = this.dataHandler.getStudents().find( student => student.id.toString() === params.id);
    });

    this.setEditStudent(this.editStudent);
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
    console.dir(student);
    this.form.patchValue({fio: student});
    this.form.patchValue({birthday: this.formatDate(student.birthday)  });
    this.form.patchValue({mark: student.averageMark});
  }

  closeEditForm(): void {
    this.isCallEditForm = false;
    this.onEdit.emit(this.isCallEditForm);
  }

  submitEditStudent(): void {
    if (this.form.valid) {
      super.submitStudent();
      this.newStudent.id = this.editStudent.id;
      // this.newStudent.id = this.dataHandler.student.id;
      this.dataHandler.editStudent(this.newStudent);
      // this.dataHandler.isCallEditFormService = false;
      // this.dataHandler.toggleForUpdate = !this.dataHandler.toggleForUpdate;
      this.isCallEditForm = false;
      this.onEdit.emit(this.isCallEditForm);
      this.router.navigate([""]);
    }
  }
}
