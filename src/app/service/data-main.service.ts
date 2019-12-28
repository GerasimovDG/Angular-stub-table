import { Injectable } from "@angular/core";


@Injectable({providedIn: "root"})
export class DataMainService {

  // debug: boolean;

  // constructor(private dataHandler: DataHandlerService,
  //             private dataServer: DataServerService) {
  // }
  //
  //
  // getStudents(debug: boolean): Observable<Student[]> {
  //   if (debug) {
  //     return of(this.dataHandler.getStudents());
  //   }
  //   this.dataServer.setLastID();
  //   return this.dataServer.getStudents();
  // }
  //
  // deleteStudent(debug: boolean, stud: Student): Observable<Student[]> {
  //   if (debug) {
  //     return of(this.dataHandler.deleteStudent(stud));
  //   }
  //   // return this.dataServer.deleteStudent(stud.id);
  //   return this.dataServer.deleteStudent(stud);
  // }
  //
  // addStudent(debug: boolean, student: Student): Observable<Student> {
  //   if (debug) {
  //     return of(this.dataHandler.addStudent(student));
  //   }
  //   return this.dataServer.addStudent(student);
  // }
  //
  // editStudent(debug: boolean, editStudent: Student): Observable<Student[]> {
  //   if (debug) {
  //     return of(this.dataHandler.editStudent(editStudent));
  //   }
  //   return this.dataServer.editStudent(editStudent);
  // }
  //
  // getLastID(debug: boolean): number {
  //   if (debug) {
  //     return this.dataHandler.getLastID();
  //   }
  //   return this.dataServer.getLastID();
  // }
}
