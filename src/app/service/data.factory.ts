import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { DataHandlerService } from "./data-handler.service";
import { DataServerService } from "./data-server.service";


// let heroServiceFactory = (logger: Logger, userService: UserService) => {
//   return new HeroService(logger, userService.user.isAuthorized);
// };
// // #enddocregion factory
//
// // #docregion provider
// export let heroServiceProvider =
//   { provide: HeroService,
//     useFactory: heroServiceFactory,
//     deps: [Logger, UserService]
//   };
// // #enddocregion provider
//

// export const serviceFactory = (dataHandler: DataHandlerService, dataServer: DataServerService, route: ActivatedRoute, http: HttpClient) => {
//   return route.queryParams.subscribe((params: Params) => {
//     if (!!params.debug) {
//       return new MainData(new DataHandlerService());
//     }
//     return new MainData(new DataServerService(http));
//   });
// };

export const serviceFactory = (route: ActivatedRoute, http: HttpClient) => {

  const tmp = route.snapshot.queryParams.debug;
  if (!!tmp) {
        return new DataHandlerService();
  }
  return new DataServerService(http);

};
