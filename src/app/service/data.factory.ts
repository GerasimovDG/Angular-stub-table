import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { DataHandlerService } from "./data-handler.service";
import { DataServerService } from "./data-server.service";


export const serviceFactory = (route: ActivatedRoute, http: HttpClient) => {

  const tmp = route.snapshot.queryParams.debug;
  if (!!tmp) {
        return new DataHandlerService();
  }
  return new DataServerService(http);
};
