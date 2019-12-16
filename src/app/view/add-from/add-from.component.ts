import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { DataHandlerService } from "../../service/data-handler.service";
import { BasicFormComponent } from "../basic-form/basic-form.component";

@Component({
  selector: "app-add-from",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./add-from.component.html",
  styleUrls: ["./add-from.component.less"]
})
export class AddFromComponent extends BasicFormComponent implements OnInit {


  ngOnInit(): void {
    console.log("aaa");
    super.ngOnInit();
  }

  submitStudent(): void {
    if (this.form.valid) {
      super.submitStudent();
      this.dataHandler.addStudent(this.newStudent);
      this.dataHandler.toggleForUpdate = !this.dataHandler.toggleForUpdate;
      this.form.reset();
    }
  }
}
