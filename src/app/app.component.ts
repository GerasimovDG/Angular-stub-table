import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-root",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"]
})
export class AppComponent {
  title = "stud-table";
}
