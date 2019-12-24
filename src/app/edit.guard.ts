import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Student } from "./model/students";
import { DataHandlerService } from "./service/data-handler.service";

@Injectable({providedIn: "root"})
export class EditGuard implements CanActivate, CanActivateChild {

  constructor(private dataHandler: DataHandlerService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    const thatStudent: Student = this.dataHandler.getStudents().find( student => student.id.toString() === route.params.id);
    if (thatStudent) {
      // return !(thatStudent.averageMark === 5);
      if (thatStudent.averageMark === 5) {
        this.router.navigate(["/"], {
          queryParams: {
            mark: false
          }
        });
      }
      return true;
    }
    this.router.navigate(["/"], {
        queryParams: {
          student: false
        }
    });
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(childRoute, state);
  }
}
