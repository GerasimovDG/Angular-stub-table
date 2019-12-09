import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Student } from "../../model/students";
import { DataHandlerService } from "../../service/data-handler.service";
import { MyValidators } from "../my.validators";

@Component({
  selector: "app-edit-form",
  templateUrl: "./edit-form.component.html",
  styleUrls: ["./edit-form.component.less"]
})
export class EditFormComponent implements OnInit {

  delForm: FormGroup;

  constructor(private dataHandler: DataHandlerService) {}

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
    this.delForm.patchValue({fio: student});
    this.delForm.patchValue({birthday: this.formatDate(student.birthday)  });
    this.delForm.patchValue({mark: student.averageMark});
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
      this.dataHandler.isCallDelFormService = false;
      this.dataHandler.student = newStudent;
      this.delForm.reset();
    }
  }

}
