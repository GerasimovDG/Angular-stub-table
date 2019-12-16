import { formatNumber } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "formatMark"
})
export class FormatMarkPipe implements PipeTransform {

  transform(mark: number, type: string = "percent"): string {
    switch (type) {
      case "percent":
          return `${ mark * (100 / 5) }%  (${mark})` ;
          break;
      case "UK":
        return (mark * (12 / 5)).toFixed(2).toString() + ` (${mark})`;
        break;
      case "RU":
        return mark.toString();
        break;
    }
    return mark.toString();
  }

}
