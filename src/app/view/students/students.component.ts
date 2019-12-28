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
  // providers: [ {
  //   provide: Data,
  //   useFactory: serviceFactory,
  //   deps: [ ActivatedRoute, HttpClient],
  // }]
})

export class StudentsComponent implements OnInit {
  // @Input() updateFlag: boolean;

  // students: Student[] = this.dataHandler.getStudents();
  students: Student[] = [];
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
  // private isEditForm: boolean;
  // private isAddForm: boolean;

  loading: boolean = false; // загружается?
  // debug: boolean = false;

  constructor(private cdr: ChangeDetectorRef,
              // private data: DataMainService,
              // private dataHandler: DataHandlerService,
              // private dataServer: DataServerService,
              private router: Router,
              private route: ActivatedRoute,
              private mData: Data,
              // private http: HttpClient
              ) {

  }

  detect(): void {
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    console.log("Init");
    // this.route.queryParams.subscribe((params: Params) => {
    //   this.data.debug = !!params.debug;
    // });
    // this.students = this.dataHandler.getStudents();
    // this.data.getStudents(this.data.debug)
    //   .subscribe( students => {
    //     console.log(students);
    //     this.students = students;
    //     this.loading = false;
    //     this.detect();
    //   });
    this.mData.getStudents()
      .subscribe( students => {
        console.log(students);
        this.students = students;
        this.loading = false;
        this.detect();
        this.mData.allStuds = this.students;
      });

    // this.loading = true;
    // this.dataServer.getStudents()
    //   .subscribe( students => {
    //     console.log(students);
    //     this.students = students;
    //     this.loading = false;
    //     this.detect();
    //   });
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
      // this.students = this.dataHandler.getStudents();
      this.mData.getStudents()
        .subscribe( (students) => {
          this.students = students;
          this.detect();
        });
    } else {
      // this.students = this.dataHandler.getStudents().filter( student => {
      //   return student.averageMark.toString() === this.mark.toString();
      // });
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
      // this.students = this.dataHandler.getStudents();
      this.mData.getStudents()
        .subscribe( (students) => {
          this.students = students;
          this.detect();
        });
    } else {
      const dateBirthday = new Date(this.birthday);
      // this.students = this.dataHandler.getStudents().filter( student => {
      //   return student.birthday.getTime() === dateBirthday.getTime();
      // });
      this.mData.getStudents()
        .subscribe( (students) => {
          this.students = students.filter( student => {
            const birthday = Date.parse( student.birthday.toString());
            console.log(dateBirthday.getTime().toString());
            console.log(birthday.toString());
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
    // this.isEditForm = true;
    // this.dataHandler.setEditStudent(student);
    this.editStudent = student;
    // if (this.data.debug) {
    //   this.router.navigate( ["/form/edit", student.id], {queryParams: {debug: true}});
    // } else {
    //   console.log(student);
    //   this.router.navigate(["/form/edit", student.id]);
    // }
    console.log(student.id);
    this.router.navigate(["/form", "edit", student.id]);
  }
  //
  // открытие формы добавления студента
  openAddForm(): void {
    // if (this.data.debug) {
    //   this.router.navigate(["/form/add"], {queryParams: {debug: true}});
    // } else {
    //   this.router.navigate(["/form/add"]);
    // }
    this.router.navigate(["/form", "add"]);
    // this.dataHandler.openAddForm();
    // this.isAddForm = true;
  }
}
