import { Injectable } from "@angular/core";
import { TestData } from "../data/test-data";
import { Student } from "../model/students";


@Injectable({
  providedIn: "root",
})
export class DataHandlerService {
  // переключатель, с помощью которого срабатывает ChangeDetectionStrategy.onPush
  // toggleForUpdate: boolean = false;
  // флаг, отвечающий за открытие формы добавления студента
  isCallFormService: boolean = false;
  // флаг, отвечающий за открытие формы редактирования студента
  // isCallEditFormService: boolean = false;
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

  openAddForm(): void {
    this.isCallFormService = true;
  }

  setEditStudent(stud: Student): void {
    this.student = stud;
    // this.isCallEditFormService = true;
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
