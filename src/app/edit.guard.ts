import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Student } from "./model/students";
import { DataHandlerService } from "./service/data-handler.service";
import { Data } from "./service/data.service";

@Injectable({providedIn: "root"})
export class EditGuard implements CanActivate, CanActivateChild {

  // private thatStudent: Student;

  constructor(private dataHandler: DataHandlerService,
              private mData: Data,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
       // this.thatStudent = this.dataHandler.getStudents().find( student => student.id.toString() === route.params.id);
        // return this.data.getStudents(this.data.debug).pipe(map( students  => {
    return this.mData.getStudents().pipe(map( students => {
          const tmp: Student = students.find( student => student.id.toString() === route.params.id);

          if (tmp) {
            console.dir(tmp);
            if (tmp.averageMark === 5) {
              // if (this.data.debug) {
              //   this.router.navigate(["/"], {queryParams: {debug: true, mark: false}});
              // } else {
              //   this.router.navigate(["/"], {queryParams: {mark: false}});
              // }
              this.router.navigate(["/"], {queryParams: {mark: false}});
            }
            return true;
          }
          this.router.navigate(["/"], {queryParams: {student: false}});
          // if (this.data.debug) {
          //   this.router.navigate(["/"], {queryParams: {debug: true, student: false}});
          // } else {
          //   this.router.navigate(["/"], {queryParams: {student: false}});
          // }

        }));


      //
      // // this.thatStudent = this.data.getStudents(this.data.debug)
      // //    .subscribe( students => {
      // //      return students.find<Student>( student => student.id.toString() === route.params.id);
      // //    })
      // // let thatStudent: Student;
      // // this.data.getStudents(this.data.debug).subscribe( students => {
      // //  this.thatStudent = students.find( student => {
      // //    console.log(student.id.toString());
      // //    console.log(route.params.id);
      // //    console.log(student.id.toString() === route.params.id);
      // //     return student.id.toString() === route.params.id;
      // //  });
      // // });
      // console.log(this.thatStudent);
      // if (this.thatStudent) {
      //   console.log(this.thatStudent);
      //   if (this.thatStudent.averageMark === 5) {
      //     if (this.data.debug) {
      //       this.router.navigate(["/"], {queryParams: {debug: true, mark: false}});
      //     } else {
      //       this.router.navigate(["/"], {queryParams: {mark: false}});
      //     }
      //   }
      //   return true;
      // }
      // // this.router.navigate(["/"], {
      // //     queryParams: {
      // //       student: false
      // //     }
      // // });
      // if (this.data.debug) {
      //   this.router.navigate(["/"], {queryParams: {debug: true, student: false}});
      // } else {
      //   this.router.navigate(["/"], {queryParams: {student: false}});
      // }
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ): Observable<boolean> | Promise<boolean> | boolean {
      return this.canActivate(childRoute, state);
  }

  // canActivate(route: ActivatedRouteSnapshot,
  //             state: RouterStateSnapshot,
  // ): Observable<boolean> | Promise<boolean> | boolean {
  //    // this.thatStudent = this.dataHandler.getStudents().find( student => student.id.toString() === route.params.id);
  //     return this.data.getStudents(this.data.debug).pipe(map( students  => {
  //       const tmp = students.find( student => student.id.toString() === route.params.id);
  //
  //       if (tmp) {
  //         console.dir(tmp);
  //         if (tmp.averageMark === 5) {
  //           if (this.data.debug) {
  //             this.router.navigate(["/"], {queryParams: {debug: true, mark: false}});
  //           } else {
  //             this.router.navigate(["/"], {queryParams: {mark: false}});
  //           }
  //         }
  //         return true;
  //       }
  //       if (this.data.debug) {
  //         this.router.navigate(["/"], {queryParams: {debug: true, student: false}});
  //       } else {
  //         this.router.navigate(["/"], {queryParams: {student: false}});
  //       }
  //
  //     }));
  //
  //
  //   //
  //   // // this.thatStudent = this.data.getStudents(this.data.debug)
  //   // //    .subscribe( students => {
  //   // //      return students.find<Student>( student => student.id.toString() === route.params.id);
  //   // //    })
  //   // // let thatStudent: Student;
  //   // // this.data.getStudents(this.data.debug).subscribe( students => {
  //   // //  this.thatStudent = students.find( student => {
  //   // //    console.log(student.id.toString());
  //   // //    console.log(route.params.id);
  //   // //    console.log(student.id.toString() === route.params.id);
  //   // //     return student.id.toString() === route.params.id;
  //   // //  });
  //   // // });
  //   // console.log(this.thatStudent);
  //   // if (this.thatStudent) {
  //   //   console.log(this.thatStudent);
  //   //   if (this.thatStudent.averageMark === 5) {
  //   //     if (this.data.debug) {
  //   //       this.router.navigate(["/"], {queryParams: {debug: true, mark: false}});
  //   //     } else {
  //   //       this.router.navigate(["/"], {queryParams: {mark: false}});
  //   //     }
  //   //   }
  //   //   return true;
  //   // }
  //   // // this.router.navigate(["/"], {
  //   // //     queryParams: {
  //   // //       student: false
  //   // //     }
  //   // // });
  //   // if (this.data.debug) {
  //   //   this.router.navigate(["/"], {queryParams: {debug: true, student: false}});
  //   // } else {
  //   //   this.router.navigate(["/"], {queryParams: {student: false}});
  //   // }
  // }
  //
  // canActivateChild(
  //   childRoute: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot,
  // ): Observable<boolean> | Promise<boolean> | boolean {
  //   return this.canActivate(childRoute, state);
  // }
}
