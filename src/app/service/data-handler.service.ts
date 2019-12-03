import { Injectable } from "@angular/core";
import { TestData } from "../data/test-data";
import { Student } from "../model/students";

@Injectable({
  providedIn: "root"
})
export class DataHandlerService {
  getStudents(): Student[] {
    return TestData.students;
  }
}
