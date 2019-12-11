import { FormControl, FormGroup } from "@angular/forms";

export class MyValidators {

  static restrictedFIO(group: FormGroup): { [key: string]: boolean} {
    const lastName = group.get("lastName").value;
    const firstName = group.get("firstName").value;
    const middleName = group.get("middleName").value;

    if ((lastName === firstName ||  firstName === middleName) && firstName  ) {
      return {"restrictedFio": true};
    }
    return null;
  }

  static restrictedDate(control: FormControl): { [key: string]: boolean} {
    const birthday = new Date(control.value);
    const nowDate = new Date();

    let flag: boolean = false;
    // 315360000000 + 172800000 миллисекунд = 10 лет + 2 дня из двух високосных годов
    if (nowDate.getTime() - birthday.getTime() < (315360000000 + 172800000)) {
          flag = true;
    }

    if (flag) {
      return {"restrictedDate": true};
    }
    return null;
  }

}
