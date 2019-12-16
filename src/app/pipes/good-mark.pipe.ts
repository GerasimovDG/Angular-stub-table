import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "goodMark"
})
export class GoodMarkPipe implements PipeTransform {

  transform(value: number): string {
    if (value >= 4.5) {
      return ` <i class="fas fa-gift"></i>`;
    }
  }

}
