import { Student } from "../model/students";

export class TestData {

  static students: Student[] = [
    {
      id: 1,
      lastName: "Герасимов",
      firstName: "Дмитрий",
      middleName: "Геннадьевич",
      birthday: new Date("2010-04-24"),
      averageMark: 4.4
    },
    {
      id: 2,
      lastName: "Курпатов ",
      firstName: "Данила",
      middleName: "Трофимович",
      birthday: new Date("2011-03-12"),
      averageMark: 3.4
    },
    {
      id: 3,
      lastName: "Дубровин",
      firstName: "Сергей",
      middleName: "Ильич",
      birthday: new Date("2010-08-12"),
      averageMark: 4
    },
    {
      id: 4,
      lastName: "Деменкова",
      firstName: "Ева",
      middleName: "Чеславовна",
      birthday: new Date("2014-07-07"),
      averageMark: 4.5
    },
    {
      id: 5,
      lastName: "Муханов",
      firstName: "Эммануил",
      middleName: "Юриевич",
      birthday: new Date("2010-08-12"),
      averageMark: 4.1
    },
    {
      id: 6,
      lastName: "Каратеева",
      firstName: "Инна",
      middleName: "Семеновна",
      birthday: new Date("2011-09-02"),
      averageMark: 4.1
    },
    {
      id: 7,
      lastName: "Ефимов",
      firstName: "Рюрик",
      middleName: "Яковлевич",
      birthday: new Date("2011-08-29"),
      averageMark: 2.4
    },
    {
      id: 8,
      lastName: "Бирюкова",
      firstName: "Наталья",
      middleName: "Семеновна",
      birthday: new Date("2012-12-12"),
      averageMark: 4.4
    },
    {
      id: 9,
      lastName: "Самсонова",
      firstName: "Александра",
      middleName: "Павловна",
      birthday: new Date("2010-10-11"),
      averageMark: 4.2
    },
    {
      id: 10,
      lastName: "Юсупова",
      firstName: "Нина",
      middleName: "Федоровна",
      birthday: new Date("2011-03-17"),
      averageMark: 2.9
    },
    {
      id: 11,
      lastName: "Петренко",
      firstName: "Николай",
      middleName: "Алексеевич",
      birthday: new Date("2011-11-11"),
      averageMark: 4.9
    },
  ];
}
