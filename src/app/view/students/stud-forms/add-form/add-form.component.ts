import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { StudFormsComponent } from "../stud-forms.component";

@Component({
  selector: "app-add-form",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./add-form.component.html",
  styleUrls: ["./add-form.component.less"]
})
export class AddFormComponent extends StudFormsComponent implements OnInit, OnDestroy {
  private addStudent$: Subscription;

  ngOnInit(): void {
    super.ngOnInit();
  }

  submitStudent(): void {
    if (this.form.valid) {
      super.submitStudent();
      this.enableBtn = false;
      this.addStudent$ = this.mData.addStudent(this.newStudent)
        .subscribe(() => {
          this.mData.pushOnHard(this.newStudent);
          this.form.reset();
          this.closeAddForm();
        });
    }
  }

  closeAddForm(): void {
    this.router.navigate([""]);
  }

  ngOnDestroy(): void {
    if (this.addStudent$) {
      this.addStudent$.unsubscribe();
    }
  }
}
