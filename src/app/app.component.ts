import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DataHandlerService } from "./service/data-handler.service";

@Component({
  selector: "app-root",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"]
})
export class AppComponent {
  title = "stud-table";

  constructor(private dataHandler: DataHandlerService) {}
}
