import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Student } from "../../model/students";
import { Data } from "../../service/data.service";

enum SearchOption {
  All,
  LastName,
  FirstName,
}
@Component({
  selector: "app-students",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./students.component.html",
  styleUrls: ["./students.component.less"],
})

export class StudentsComponent implements OnInit {

  private editStudent: Student;

  private students: Student[] = [];
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

  loading: boolean = false; // загружается?

  constructor(private cdr: ChangeDetectorRef,
              private router: Router,
              private route: ActivatedRoute,
              private mData: Data,
              ) {
  }

  detect(): void {
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    console.log("Init");

    this.mData.getStudents()
      .subscribe( students => {
        console.log(students);
        this.students = students;
        this.loading = false;
        this.detect();
        this.mData.allStuds = this.students;
      });
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
      this.mData.getStudents()
        .subscribe( (students) => {
          this.students = students;
          this.detect();
        });
    } else {
      this.mData.getStudents()
        .subscribe( (students) => {
          this.students = students.filter( student => {
            return student.averageMark.toString() === this.mark.toString();
          });
          this.detect();
        });
    }
  }
  setStudentsByBirthday(): void {
    if (!this.birthday) {
      this.mData.getStudents()
        .subscribe( (students) => {
          this.students = students;
          this.detect();
        });
    } else {
      const dateBirthday = new Date(this.birthday);
      this.mData.getStudents()
        .subscribe( (students) => {
          this.students = students.filter( student => {
            const birthday = Date.parse( student.birthday.toString());
            return birthday.toString() === dateBirthday.getTime().toString();
          });
          this.detect();
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
      this.mData.deleteStudent(stud)
        .subscribe( students => {
          this.students = students;
          this.detect();
        });
    }
  }

  isSort(name: string): boolean {
    if (this.sort === name) {
      console.log((this.sort));
      return true;
    }
    return false;
  }

  // открытие формы редактирования студента
  setEditStudent(student: Student): void {
    this.editStudent = student;
    this.router.navigate(["/form", "edit", student.id]);
  }

  // открытие формы добавления студента
  openAddForm(): void {
    this.router.navigate(["/form", "add"]);
  }
}
