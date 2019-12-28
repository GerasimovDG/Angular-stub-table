import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Student } from "../model/students";

@Injectable({providedIn: "root"})
export abstract class Data {

  protected lastID: number;
  allStuds: Student[];

  abstract getStudents(): Observable<Student[]>;
  abstract addStudent(student: Student): Observable<Student>;
  abstract deleteStudent(id: number | Student): Observable<Student[]>;
  abstract editStudent(student: Student): Observable<Student[]>;

  abstract get lastId(): number;
  abstract set lastId(id: number);

}
