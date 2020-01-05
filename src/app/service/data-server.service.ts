import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Student } from "../model/students";
import { Data } from "./data.service";

@Injectable({providedIn: "root"})
export class DataServerService extends Data {

  constructor(private http: HttpClient) {
    super();
  }

  addStudent(student: Student): Observable<Student> {
    this.lastId = student.id;
    this.allStuds.push(student);
    return this.http.post<Student>(environment.apiUrl + "/items", student);
  }

  deleteStudent(stud: Student): Observable<Student[]> {
    return this.http.delete<Student[]>(`${environment.apiUrl}/items/${stud.id}`);
  }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(environment.apiUrl + "/items");
  }

  getHardStudents(): Student[] {
    return this.allStuds;
  }

  editStudent(student: Student): Observable<Student[]> {
     return this.http.put<Student[]>(`${environment.apiUrl}/items/${student.id}`, student);
  }

  set lastId(id: number) {
    this.lastID = id;
  }

  get lastId(): number {
    return this.lastID;
  }
}
