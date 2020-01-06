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

    if (!this.mData.onInit) {
      this.mData.getStudents()
        .subscribe( students => {
          this.students = students;
          this.loading = false;
          this.mData.allStuds = this.students;
          this.mData.lastId = students[students.length - 1].id;
          this.mData.onInit = true;
          this.detect();
        }, error => {
          if (error.status >= 500) {
            this.router.navigate(["serverError"], {
              queryParams: {
                status: error.status,
                statusText: error.statusText,
                url: error.url,
              }
            });
          }
        });
    }

    this.students = this.mData.getHardStudents();
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
      this.students = this.mData.getHardStudents();
    } else {
      this.students = this.mData.getHardStudents().filter( student => {
        return student.averageMark.toString() === this.mark.toString();
      });
    }
  }
  setStudentsByBirthday(): void {
    if (!this.birthday) {
      this.students = this.mData.getHardStudents();
    } else {
      const dateBirthday = new Date(this.birthday);
      this.students = this.mData.getHardStudents().filter( student => {
        const birthday = Date.parse( student.birthday.toString());
        return birthday.toString() === dateBirthday.getTime().toString();
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
        .subscribe( () => {
          this.mData.allStuds = this.mData.allStuds.filter(student => student !== stud);
          this.students = this.mData.getHardStudents();
          this.detect();
        }, error => {
        if (error.status >= 500) {
          this.router.navigate(["serverError"], {
            queryParams: {
              status: error.status,
              statusText: error.statusText,
              url: error.url,
            }
          });
        }
      });
    }
  }

  isSort(name: string): boolean {
    return this.sort === name;
  }

  // открытие формы редактирования студента
  setEditStudent(student: Student): void {
    this.router.navigate(["/form", "edit", student.id]);
  }

  // открытие формы добавления студента
  openAddForm(): void {
    this.router.navigate(["/form", "add"]);
  }
}
