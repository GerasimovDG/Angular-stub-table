import { Directive, ElementRef, HostListener, Input, Renderer2 } from "@angular/core";

@Directive({
  selector: "[appHighlight]"
})
export class HighlightDirective {

  @Input("appHighlight") mark: number;
  flag: boolean = false;

  constructor(private renderer: Renderer2, private el: ElementRef) {
  }

  @HostListener("dblclick") onClick(): void {
    this.flag = !this.flag;
    if (this.flag) {
      if (this.mark >= 4.5) {
        this.renderer.setStyle(this.el.nativeElement, "backgroundColor", "rgba(0,204,102,0.3)");
        this.renderer.setStyle(this.el.nativeElement, "border", "2px solid #F56433");
      } else if (this.mark < 3) {
        this.renderer.setStyle(this.el.nativeElement, "backgroundColor", "rgba(100, 0, 0, 0.5)");
        this.renderer.setStyle(this.el.nativeElement, "border", "2px solid #F56433");
      } else {
        this.renderer.setStyle(this.el.nativeElement, "backgroundColor", "rgba(0, 0, 0, 0.1)");
        this.renderer.setStyle(this.el.nativeElement, "border", "2px solid #F56433");
      }
    } else {
      this.renderer.setStyle(this.el.nativeElement, "backgroundColor", null);
      this.renderer.setStyle(this.el.nativeElement, "border", null);
    }
  }

  @HostListener("mouseenter") onEnter(): void {
    this.renderer.setStyle(this.el.nativeElement, "fontWeight", "bold");
  }
  @HostListener("mouseleave") onLeave(): void {
    this.renderer.setStyle(this.el.nativeElement, "fontWeight", null);
  }
}
