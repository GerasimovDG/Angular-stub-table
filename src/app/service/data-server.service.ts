import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Student } from "../model/students";
import { Data } from "./data.service";

@Injectable({providedIn: "root"})
export class DataServerService extends Data {

  private url: string = "http://localhost:3000";

  constructor(private http: HttpClient) {
    super();
    this.getStudents().subscribe( students => this.lastID = students[students.length - 1].id);
  }

  addStudent(student: Student): Observable<Student> {
    this.lastId = student.id;
    return this.http.post<Student>(this.url + "/items", student);
  }

  deleteStudent(stud: Student): Observable<Student[]> {
    return this.http.delete<Student[]>(`${this.url}/items/${stud.id}`);
  }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.url + "/items");
  }

  editStudent(student: Student): Observable<Student[]> {
     return this.http.put<Student[]>(`${this.url}/items/${student.id}`, student);
  }

  set lastId(id: number) {
    this.lastID = id;
  }

  get lastId(): number {
    return this.lastID;
  }
}
