import { Injectable } from "@angular/core";
import { Test } from "tslint";
import { TestData } from "../data/test-data";
import { Student } from "../model/students";

@Injectable({
  providedIn: "root"
})
export class DataHandlerService {

  // флаг, отвечающий за открытие формы добавления студента
  isCallFormService: boolean = false;
  // флаг, отвечающий за открытие формы редактирования студента
  isCallDelFormService: boolean = false;
  student: Student;

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

  setEditStudent(stud: Student): void {
    this.student = stud;
    this.isCallDelFormService = true;
  }

  editStudent(stud: Student): void {
    const find = TestData.students.find( student => {
       return student.id === stud.id;
    });
    find.lastName = stud.lastName;
    find.firstName = stud.firstName;
    find.middleName = stud.middleName;
    find.birthday = stud.birthday;
    find.averageMark = stud.averageMark;
  }
}
