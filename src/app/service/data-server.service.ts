import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Student } from "../model/students";
import { Data } from "./data.service";

@Injectable({providedIn: "root"})
export class DataServerService extends Data {

  // private lastID: number = 0;
  private url: string = "http://localhost:3000";

  constructor(private http: HttpClient) {
    super();
    this.getStudents().subscribe( students => this.lastID = students[students.length - 1].id);
  }

  addStudent(student: Student): Observable<Student> {
    // this.setLastID(student.id);
    this.lastid = student.id;
    return this.http.post<Student>(this.url + "/items", student);
  }

  // deleteStudent(id: number): Observable<Student[]> {
  //   return this.http.delete<Student[]>(`http://localhost:3000/items/${id}`);
  // }
  deleteStudent(stud: Student): Observable<Student[]> {
    return this.http.delete<Student[]>(`http://localhost:3000/items/${stud.id}`);
  }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.url + "/items");
  }

  getStudent(id: number): Observable<Student> {
    return this.http.get<Student>(`http://localhost:3000/items/${id}`);
  }

  editStudent(student: Student): Observable<Student[]> {
     return this.http.put<Student[]>(`http://localhost:3000/items/${student.id}`, student);
  }

  set lastid(id: number) {
    this.lastID = id;
  }

  get lastid(): number {
    return this.lastID;
  }
}
