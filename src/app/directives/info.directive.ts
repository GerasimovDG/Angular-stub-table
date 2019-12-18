import { Directive, ElementRef, HostListener, Input, Renderer2 } from "@angular/core";
import { DataHandlerService } from "../service/data-handler.service";

@Directive({
  selector: "[appInfo]"
})
export class InfoDirective {

  constructor(private renderer: Renderer2, private el: ElementRef, private dataHandler: DataHandlerService) {}
  flag: boolean = true;

  @Input("appInfo") obj: {};

  tr: Node[] = [];
  td: Node[] = [];
  tdKey: Node[] = [];
  keys: string[];
  values: string[];

  @HostListener("dblclick") onClick(): void {

    this.keys = Object.keys(this.obj);
    this.values = Object.values(this.obj);

    if (this.flag) {

      for (let i = 0; i < this.keys.length; i++) {
        this.tr[i] = this.renderer.createElement("tr");
        this.td[i] = this.renderer.createElement("td");
        this.tdKey[i] = this.renderer.createElement("td");
        this.tdKey[i].textContent = `${this.keys[i].toUpperCase()}:  `;
        this.td[i].textContent = `${this.values[i]}`;
        this.renderer.addClass(this.tr[i], "table-info");
        this.renderer.setAttribute(this.tdKey[i], "colspan", "2");
        this.renderer.setAttribute(this.td[i], "colspan", "6");
        this.renderer.setStyle(this.td[i], "textAlign", "left");

        this.renderer.appendChild(this.tr[i], this.tdKey[i]);
        this.renderer.appendChild(this.tr[i], this.td[i]);
        this.renderer.appendChild(this.el.nativeElement, this.tr[i]);
      }

    } else {
      for (let i = 0; i < this.keys.length; i++) {
          this.renderer.removeChild(this.el.nativeElement, this.tr[i]);
      }
    }
    this.flag = !this.flag;
  }
}
