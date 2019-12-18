import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from "@angular/core";
import { BasicFormComponent } from "../basic-form/basic-form.component";

@Component({
  selector: "app-add-form",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./add-form.component.html",
  styleUrls: ["./add-form.component.less"]
})
export class AddFormComponent extends BasicFormComponent implements OnInit {

  @Output() onCloseForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  private isCallAddForm: boolean;

  ngOnInit(): void {
    super.ngOnInit();
  }

  submitStudent(): void {
    if (this.form.valid) {
      super.submitStudent();
      this.dataHandler.addStudent(this.newStudent);
      // this.dataHandler.toggleForUpdate = !this.dataHandler.toggleForUpdate;
      this.form.reset();
    }
  }

  closeAddForm(): void {
    this.isCallAddForm = false;
    this.onCloseForm.emit(this.isCallAddForm);
  }
}
