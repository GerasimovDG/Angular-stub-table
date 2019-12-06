import { formatDate } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Student } from "../../model/students";
import { DataHandlerService } from "../../service/data-handler.service";
import { MyValidators } from "../my.validators";

@Component({
  selector: "app-delete-form",
  templateUrl: "./delete-form.component.html",
  styleUrls: ["./delete-form.component.less"]
})
export class DeleteFormComponent implements OnInit {

  delForm: FormGroup;
  editStudent: Student = this.dataHandler.getStudents()[0];

  constructor(private dataHandler: DataHandlerService) {
  }

  ngOnInit(): void {
    this.delForm = new FormGroup( {
      fio: new FormGroup( {
        lastName: new FormControl("", [Validators.required]),
        firstName: new FormControl("", [Validators.required]),
        middleName: new FormControl("", [Validators.required])
      }, [Validators.required, MyValidators.restrictedFIO ]),
      birthday: new FormControl("", [Validators.required, MyValidators.restrictedDate]),
      mark: new FormControl("", [Validators.required, Validators.max(5), Validators.min(0)]),
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
    this.delForm.patchValue({fio: this.dataHandler.student});
    this.delForm.patchValue({birthday: this.formatDate(this.dataHandler.student.birthday)  });
    this.delForm.patchValue({mark: this.dataHandler.student.averageMark});
  }

  submitEditStudent(): void {
    if (this.delForm.valid) {
      const data = {...this.delForm.value};

      const newStudent: Student = new Student(
        this.dataHandler.student.id,
        data.fio.lastName,
        data.fio.firstName,
        data.fio.middleName,
        new Date(data.birthday),
        data.mark,
      );
      this.dataHandler.editStudent(newStudent);
    }
  }




}