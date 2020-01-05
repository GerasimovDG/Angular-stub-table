import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { StudFormsComponent } from "../stud-forms.component";

@Component({
  selector: "app-add-form",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./add-form.component.html",
  styleUrls: ["./add-form.component.less"]
})
export class AddFormComponent extends StudFormsComponent implements OnInit {

  ngOnInit(): void {
    super.ngOnInit();
  }

  submitStudent(): void {
    if (this.form.valid) {
      super.submitStudent();
      this.mData.addStudent(this.newStudent)
        .subscribe( () => {
          this.form.reset();
          this.closeAddForm();
        });
    }
  }

  closeAddForm(): void {
    this.router.navigate([""]);
  }
}
