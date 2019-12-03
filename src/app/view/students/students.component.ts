import { Component, OnInit } from "@angular/core";
import { Student } from "../../model/students";
import { DataHandlerService } from "../../service/data-handler.service";

@Component({
  selector: "app-students",
  templateUrl: "./students.component.html",
  styleUrls: ["./students.component.less"]
})
export class StudentsComponent implements OnInit {

  students: Student[];
  tmpStudents: Student[];
  feature: boolean = true;
  search: string = "";
  searchField: string = "All";
  mark: number;
  birthday: string;
  sortUp: boolean = true;

  constructor(private dataHandler: DataHandlerService) { }

  ngOnInit(): void {
    this.students = this.dataHandler.getStudents();
    this.tmpStudents = this.students;
  }

  toggleFeature(): void {
    this.feature = !this.feature;
  }

  getFeature(): boolean {
    return this.feature;
  }

  trackByStudentID( student: Student): number {
    return student.id;
  }

  isSearch(student: Student, searchField: string): boolean {
    if (!this.search.trim()) {
      return false;
    }
    switch (searchField) {
      case "All":
        if (student.lastName.toLocaleLowerCase().includes(this.search.toLowerCase()) ||
        student.firstName.toLocaleLowerCase().includes(this.search.toLowerCase())) {
          return true;
        }
        break;
      case "lastName":
        if (student.lastName.toLocaleLowerCase().includes(this.search.toLowerCase())) {
          return true;
        }
        break;
      case "firstName":
        if (student.firstName.toLocaleLowerCase().includes(this.search.toLowerCase())) {
          return true;
        }
        break;
    }
    return false;
  }

  setStudentsByMark(mark: number): void {
    if (mark.toString() === "") {
      this.students = this.tmpStudents;
    } else {
      this.students = this.tmpStudents.filter(student => {
        return student.averageMark.toString() === mark.toString();
      });
    }
  }
  setStudentsByBirthday(birthday: string): void {
    const dateBirthday = new Date(birthday);
    if (birthday.toString() === "") {
      this.students = this.tmpStudents;
    } else {
      this.students = this.tmpStudents.filter(student => {
        return student.birthday.getTime() === dateBirthday.getTime();
      });
    }
  }

  sortTableBy(sortBy: string): void {
    if (sortBy === "id") {
      this.students.sort((first: Student, second: Student) => {
        return first.id >= second.id ? 1 : -1;
      });
    } else {
      this.students.sort((first: Student, second: Student) => {
        if (this.sortUp) {
          return first[sortBy] >= second[sortBy] ? 1 : -1;
        }
        return first[sortBy] <= second[sortBy] ? 1 : -1;
      });
    }
  }

  deleteStudent(stud: Student): void {
    const ans: boolean = confirm(`Вы точно хотите удалить студента: ${stud.lastName} ${stud.firstName} ${stud.middleName}?`);
    if (ans === true) {
      this.students = this.students.filter(student =>  student !== stud);
      this.tmpStudents = this.students;
    }
  }
}
