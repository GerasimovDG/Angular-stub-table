import { Injectable } from "@angular/core";
import { TestData } from "../data/test-data";
import { Student } from "../model/students";

@Injectable({
  providedIn: "root"
})
export class DataHandlerService {

  // флаг, отвечающий за открытие формы добавления студента
  isCallFormService: boolean = false;

  getStudents(): Student[] {
    return TestData.students;
  }

  getLastID(): number {
    return TestData.students[TestData.students.length - 1].id;
  }

  addStudent(student: Student): void {
    TestData.students.push(student);
  }

  deleteStudent(stud: Student): void {
    TestData.students = TestData.students.filter(student => student !== stud);
  }
}
