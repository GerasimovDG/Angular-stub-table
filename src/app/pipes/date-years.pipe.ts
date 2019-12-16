import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "dateYears"
})
export class DateYearsPipe implements PipeTransform {

  transform(value: string): string {
    const nowDate: Date = new Date();
    const date = value.trim().split(".");
    const valueDate = new Date(parseInt(date [2], 10),
      parseInt(date [1], 10) - 1,
      parseInt(date [0], 10));
    if (nowDate.getMonth() - valueDate.getMonth() < 0) {
      return `${value} (${(nowDate.getFullYear() - valueDate.getFullYear() - 1).toString()})`;
    }
    if (nowDate.getMonth() - valueDate.getMonth() > 0) {
      return `${value} (${(nowDate.getFullYear() - valueDate.getFullYear()).toString()}) `;
    }
    if (nowDate.getMonth() - valueDate.getMonth() === 0) {
      if (nowDate.getDate() - valueDate.getDate() < 0) {
        return `${value} (${(nowDate.getFullYear() - valueDate.getFullYear() - 1).toString()}) `;
      }
      if (nowDate.getDate() - valueDate.getDate() >= 0) {
        return `${value} (${(nowDate.getFullYear() - valueDate.getFullYear()).toString()})`;
      }
      return `${value} (${(nowDate.getFullYear() - valueDate.getFullYear()).toString()})`;
    }
  }

}
