import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DataHandlerService } from "./service/data-handler.service";

@Injectable({providedIn: "root"})
export class EditGuard implements CanActivate, CanActivateChild {

  constructor(private dataHandler: DataHandlerService) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    const mark: number = this.dataHandler.student.averageMark;
    console.dir(route.params);
    console.dir(mark);

    return !(mark === 5);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(childRoute, state);
  }
}
