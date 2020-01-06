import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-error500-page",
  templateUrl: "./error500-page.component.html",
  styleUrls: ["./error500-page.component.less"]
})
export class Error500PageComponent implements OnInit {

  status;
  statusText;
  url;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.status = this.route.snapshot.queryParams.status;
    this.statusText = this.route.snapshot.queryParams.statusText;
    this.url = this.route.snapshot.queryParams.url;
    console.log(this.status);
  }

}
