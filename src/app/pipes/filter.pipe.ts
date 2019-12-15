import { Pipe, PipeTransform } from "@angular/core";
import { Student } from "../model/students";

@Pipe({
  name: "filter"
})
export class FilterPipe implements PipeTransform {

  transform(students: Student[], search: string = ""): Student[] {
    if (typeof search === "string") {
      if (!search.trim()) {
        return students;
      }
    }
    return students.filter( student => {
     return student.lastName.toLowerCase().includes(search.toLowerCase());
    });
  }

}
