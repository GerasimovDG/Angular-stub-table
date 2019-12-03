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
  feature: boolean = true;
  search: string = "";
  searchField: string = "All";
  mark: number;
  birthday: string;

  constructor(private dataHandler: DataHandlerService) { }

  ngOnInit(): void {
    this.students = this.dataHandler.getStudents();
  }

  toggleFeature(): void {
    this.feature = !this.feature;
  }

  getFeature(): boolean {
    return this.feature;
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
    // if (student.lastName.toLocaleLowerCase().includes(this.search.toLowerCase()) ||
    //   student.firstName.toLocaleLowerCase().includes(this.search.toLowerCase())) {
    //   return true;
    // }
    return false;
  }

  setStudentsByMark(mark: number): void {
    if (mark.toString() === "") {
      this.students = this.dataHandler.getStudents();
    } else {
      this.students = this.dataHandler.getStudents().filter(student => {
        console.log(student.averageMark.toString() === mark.toString());
        return student.averageMark.toString() === mark.toString();
      });
    }
  }
  setStudentsByBirthday(birthday: string): void {
    const dateBirthday = new Date(birthday);
    if (birthday.toString() === "") {
      this.students = this.dataHandler.getStudents();
    } else {
      this.students = this.dataHandler.getStudents().filter(student => {
        return student.birthday.getTime() === dateBirthday.getTime();
      });
    }
  }
}
