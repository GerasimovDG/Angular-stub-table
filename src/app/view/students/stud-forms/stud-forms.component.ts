import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Student } from "../../../model/students";
import { DataHandlerService } from "../../../service/data-handler.service";
import { DataServerService } from "../../../service/data-server.service";
import { Data } from "../../../service/data.service";
import { MyValidators } from "../../my.validators";

@Component({
  selector: "app-stud-forms",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./stud-forms.component.html",
  styleUrls: ["./stud-forms.component.less"]
})
export class StudFormsComponent implements OnInit {

  protected form: FormGroup;
  protected newStudent: Student;
  // protected debug: boolean;

  constructor(protected dataHandler: DataHandlerService,
              protected dataServer: DataServerService,
              protected mData: Data,
              protected route: ActivatedRoute,
              protected router: Router,
  ) {}

  ngOnInit(): void {
    // this.route.queryParams.subscribe((params: Params) => {
    //   this.data.debug = !!params.debug;
    // });
    this.form = new FormGroup( {
      fio: new FormGroup( {
        lastName: new FormControl("", [Validators.required]),
        firstName: new FormControl("", [Validators.required]),
        middleName: new FormControl("", [Validators.required])
      }, [Validators.required, MyValidators.restrictedFIO ]),
      birthday: new FormControl("", [Validators.required, MyValidators.restrictedDate]),
      mark: new FormControl("", [Validators.required, Validators.max(5), Validators.min(0)]),
    });

  }

  submitStudent(): void {
    if (this.form.valid) {
      const data = {...this.form.value};

      const value = data.mark.toString().split("");
      data.mark = +value.filter( el => el !== "," && el !== "." ).join(".");


      this.newStudent = new Student(
        // this.dataServer.getLastID() + 1,
         // this.data.getLastID(this.data.debug) + 1,
        // this.mData.getLastID() + 1,
        this.mData.lastid + 1,
        data.fio.lastName,
        data.fio.firstName,
        data.fio.middleName,
        new Date(data.birthday),
        data.mark,
      );
    }
  }
}
