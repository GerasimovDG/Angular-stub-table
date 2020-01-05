import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Student } from "./model/students";
import { DataHandlerService } from "./service/data-handler.service";
import { Data } from "./service/data.service";

@Injectable({providedIn: "root"})
export class EditGuard implements CanActivate, CanActivateChild {

  constructor(private dataHandler: DataHandlerService,
              private mData: Data,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot,
              ): Observable<boolean> | Promise<boolean> | boolean {

    let tmp: Student;

    // если перешли на редактирование студента сразу по ссылке в url, а не по кнопке
    // если перешли сразу по ссылке, то allStuds еще пустой.
    if (!this.mData.getHardStudents()) {
      return this.mData.getStudents().pipe(map(students => {
        tmp = students.find(student => student.id.toString() === route.params.id);

        if (tmp) {
          if (tmp.averageMark === 5) {
            this.router.navigate([""], {queryParams: {mark: false}});
          }
          return true;
        }
        this.router.navigate([""], {queryParams: {student: false}});
      }));
    }
    // тут уже если перешли по кнопке
    tmp = this.mData.getHardStudents().find(student => student.id.toString() === route.params.id);
    if (tmp) {
      if (tmp.averageMark === 5) {
        this.router.navigate([""], {queryParams: {mark: false}});
      }
      return true;
    }
    this.router.navigate([""], {queryParams: {student: false}});
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ): Observable<boolean> | Promise<boolean> | boolean {
      return this.canActivate(childRoute, state);
  }
}
