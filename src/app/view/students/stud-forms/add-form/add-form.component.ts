import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from "@angular/core";
import { StudFormsComponent } from "../stud-forms.component";

@Component({
  selector: "app-add-form",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./add-form.component.html",
  styleUrls: ["./add-form.component.less"]
})
export class AddFormComponent extends StudFormsComponent implements OnInit {

  @Output() onCloseForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  private isCallAddForm: boolean;

  ngOnInit(): void {
    super.ngOnInit();
  }

  submitStudent(): void {
    if (this.form.valid) {
      super.submitStudent();
     // this.dataHandler.addStudent(this.newStudent);
      // this.data.addStudent(this.data.debug, this.newStudent)
      this.mData.addStudent(this.newStudent)
      // this.dataServer.addStudent(this.newStudent)
        .subscribe( stud => {
          console.dir(stud);
          this.form.reset();
          this.closeAddForm();
        });
      // this.dataHandler.toggleForUpdate = !this.dataHandler.toggleForUpdate;
    }
  }

  closeAddForm(): void {
    this.isCallAddForm = false;
    // this.onCloseForm.emit(this.isCallAddForm);
    // this.router.navigate([""]);
    // if (this.data.debug) {
    //   this.router.navigate([""], {queryParams: {debug: true}});
    // } else {
    //   this.router.navigate([""]);
    // }
    this.router.navigate([""]);
  }
}
