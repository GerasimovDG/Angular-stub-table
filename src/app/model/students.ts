export class Student {
  id: number;
  lastName: string;
  firstName: string;
  middleName: string;
  birthday: Date;
  averageMark: number;

  constructor(id: number = 0,
              lastName: string = "",
              firstName: string = "",
              middleName: string = "",
              birthday: Date = new Date("0000-00-00"),
              averageMark: number = 0) {
    this.id = id;
    this.lastName = lastName;
    this.firstName = firstName;
    this.middleName = middleName;
    this.birthday = birthday;
    this.averageMark = averageMark;
  }
}
