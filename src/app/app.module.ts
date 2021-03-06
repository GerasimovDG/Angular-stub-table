import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { Error500PageComponent } from "./error-pages/error500-page/error500-page.component";
import { PageNotFoundComponent } from "./error-pages/page-not-found/page-not-found.component";
import { DataHandlerService } from "./service/data-handler.service";
import { DataServerService } from "./service/data-server.service";
import { serviceFactory } from "./service/data.factory";
import { Data } from "./service/data.service";
import { StudentsModule } from "./view/students/students.module";

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    Error500PageComponent,
  ],
  imports: [
    BrowserModule,
    StudentsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [DataHandlerService, DataServerService, {
  provide: Data,
  useFactory: serviceFactory,
  deps: [ ActivatedRoute, HttpClient],
}],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
