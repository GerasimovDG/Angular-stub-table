import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Student } from "../../model/students";
import { DataHandlerService } from "../../service/data-handler.service";


enum SearchOption {
  All,
  LastName,
  FirstName,
}
@Component({
  selector: "app-students",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./students.component.html",
  styleUrls: ["./students.component.less"]
})

export class StudentsComponent implements OnInit {
  // @Input() updateFlag: boolean;

  students: Student[] = this.dataHandler.getStudents();
  feature: boolean = true;
  search: string = "";
  lastNameSearch: string = "";

  searchOption = SearchOption;
  searchField = this.searchOption.All;

  mark: number;
  birthday: Date;
  sortUp: boolean = true;
  sort: string;

  delStudent: Student = new Student();
  hidden: boolean = false;
  private editStudent: Student;
  private isEditForm: boolean;
  private isAddForm: boolean;

  constructor(private cdr: ChangeDetectorRef, private dataHandler: DataHandlerService, private router: Router) { }

  detect(): void {
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    this.students = this.dataHandler.getStudents();
  }

  toggleFeature(): void {
    this.feature = !this.feature;
  }

  getFeature(): boolean {
    return this.feature;
  }

  trackByStudentID(index: number, student: Student): number {
    return student.id;
  }

  isSearch(student: Student): boolean {
    if (!this.search.trim()) {
      return false;
    }
    switch (this.searchField) {
      case SearchOption.All:
        if (student.lastName.toLocaleLowerCase().includes(this.search.toLowerCase()) ||
        student.firstName.toLocaleLowerCase().includes(this.search.toLowerCase())) {
          return true;
        }
        break;
      case SearchOption.LastName:
        if (student.lastName.toLocaleLowerCase().includes(this.search.toLowerCase())) {
          return true;
        }
        break;
      case SearchOption.FirstName:
        if (student.firstName.toLocaleLowerCase().includes(this.search.toLowerCase())) {
          return true;
        }
        break;
    }
    return false;
  }

  setStudentsByMark(): void {
    if (!this.mark) {
      this.students = this.dataHandler.getStudents();
    } else {
      this.students = this.dataHandler.getStudents().filter( student => {
        return student.averageMark.toString() === this.mark.toString();
      });
    }
  }
  setStudentsByBirthday(): void {
    if (!this.birthday) {
      this.students = this.dataHandler.getStudents();
    } else {
      const dateBirthday = new Date(this.birthday);
      this.students = this.dataHandler.getStudents().filter( student => {
        return student.birthday.getTime() === dateBirthday.getTime();
      });
    }
  }

  sortTableBy(sortBy: string): void {
    this.sort = sortBy;
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

  // удаление студента
  deleteStudent(stud: Student): void {
    if (stud) {
      this.dataHandler.deleteStudent(stud);
      this.students = this.dataHandler.getStudents();
    }
  }

  isSort(name: string): boolean {
    if (this.sort === name) {
      console.log((this.sort));
      return true;
    }
    return false;
  }

  setEditStudent(student: Student): void {
    this.isEditForm = true;
    this.dataHandler.setEditStudent(student);
    this.editStudent = student;
    this.router.navigate( ["/form/edit", student.id]);
  }

  openAddForm(): void {
    this.router.navigate(["/form/add"]);
    // this.dataHandler.openAddForm();
    this.isAddForm = true;
  }
}
