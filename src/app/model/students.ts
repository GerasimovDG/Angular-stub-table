export class Student {
  id: number;
  lastName: string;
  firstName: string;
  middleName: string;
  birthday: Date;
  averageMark: number;

  constructor(id: number, lastName: string, firstName: string, middleName: string, birthday: Date, averageMark: number) {
    this.id = id;
    this.lastName = lastName;
    this.firstName = firstName;
    this.middleName = middleName;
    this.birthday = birthday;
    this.averageMark = averageMark;
  }
}
