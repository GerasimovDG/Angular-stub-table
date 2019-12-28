import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Student } from "../../../../model/students";
import { DataHandlerService } from "../../../../service/data-handler.service";
import { DataServerService } from "../../../../service/data-server.service";
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

  @Output() onEdit: EventEmitter<boolean> = new EventEmitter<boolean>();
  private isCallEditForm: boolean;

  constructor(protected dataHandler: DataHandlerService,
              protected dataServer: DataServerService,
              protected mData: Data,
              protected route: ActivatedRoute,
              protected router: Router) {
    super(dataHandler, dataServer, mData, route, router);
  }

  ngOnInit(): void {
    super.ngOnInit();

    const id = this.route.snapshot.params.id;
    this.editStudent = this.mData.allStuds.find(student => student.id.toString() === id);
    this.setEditStudent(this.editStudent);
  }

  formatDate(date: Date): string {
    console.log(typeof date);
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
  //
  setEditStudent(student: Student): void {
    console.dir(student);
    this.form.patchValue({fio: student});
    this.form.patchValue({birthday: this.formatDate(new Date(student.birthday)) });
    this.form.patchValue({mark: student.averageMark});
  }

  closeEditForm(): void {
    this.isCallEditForm = false;
    // this.onEdit.emit(this.isCallEditForm);
    // if (this.data.debug) {
    //   this.router.navigate([""], {queryParams: {debug: true}});
    // } else {
    //   this.router.navigate([""]);
    // }
    this.router.navigate([""]);
  }

  submitEditStudent(): void {
    if (this.form.valid) {
      super.submitStudent();
      this.newStudent.id = this.editStudent.id;
      // this.newStudent.id = this.dataHandler.student.id;
      // this.dataHandler.editStudent(this.newStudent);
      // this.data.editStudent(this.data.debug, this.newStudent)
      //   .subscribe( students => {
      //     console.log(students);
      //     if (this.data.debug) {
      //       this.router.navigate([""], {queryParams: {debug: true}});
      //     } else {
      //       this.router.navigate([""]);
      //     }
      //   });
      this.mData.editStudent(this.newStudent)
        .subscribe( students => {
          console.log(students);
          // if (this.data.debug) {
          //   this.router.navigate([""], {queryParams: {debug: true}});
          // } else {
          //   this.router.navigate([""]);
          // }
          this.router.navigate([""]);
        });
      // this.dataHandler.isCallEditFormService = false;
      // this.dataHandler.toggleForUpdate = !this.dataHandler.toggleForUpdate;
      // this.isCallEditForm = false;
      // this.onEdit.emit(this.isCallEditForm);
      // if (this.data.debug) {
      //   this.router.navigate([""], {queryParams: {debug: true}});
      // } else {
      //   this.router.navigate([""]);
      // }
    }
  }
}
