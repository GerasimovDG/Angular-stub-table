import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { TestData } from "../data/test-data";
import { Student } from "../model/students";
import { Data } from "./data.service";


@Injectable({
  providedIn: "root",
})
export class DataHandlerService extends Data {
  // переключатель, с помощью которого срабатывает ChangeDetectionStrategy.onPush
  // toggleForUpdate: boolean = false;
  // флаг, отвечающий за открытие формы добавления студента
  isCallFormService: boolean = false;
  // флаг, отвечающий за открытие формы редактирования студента
  // isCallEditFormService: boolean = false;
  student: Student;

  getStudents(): Observable<Student[]> {
    return of(TestData.students);
  }

  set lastid(id: number) {
    this.lastID = id;
  }

  get lastid(): number {
    let maxId: number = 0;
    TestData.students.forEach( student => {
      if (student.id > maxId) {
        maxId = student.id;
      }
    });
    return maxId;
  }

  addStudent(student: Student):  Observable<Student> {
    TestData.students.push(student);
    // this.setLastID(student.id);
    this.lastid = student.id;
    return of(student);
  }

  deleteStudent(stud: Student): Observable<Student[]> {
    TestData.students = TestData.students.filter(student => student !== stud);
    return of(TestData.students);
  }

  openAddForm(): void {
    this.isCallFormService = true;
  }

  setEditStudent(stud: Student): void {
    this.student = stud;
    // this.isCallEditFormService = true;
  }

  editStudent(stud: Student):  Observable<Student[]> {
    const find = TestData.students.find( student => {
       return student.id === stud.id;
    });
    find.lastName = stud.lastName;
    find.firstName = stud.firstName;
    find.middleName = stud.middleName;
    find.birthday = stud.birthday;
    find.averageMark = stud.averageMark;
    return of(TestData.students);
  }
}
