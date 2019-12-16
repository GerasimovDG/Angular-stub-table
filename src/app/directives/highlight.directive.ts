import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";

@Directive({
  selector: "[appHighlight]"
})
export class HighlightDirective {
  flag: boolean = false;

  constructor(private renderer: Renderer2, private el: ElementRef) {
  }


  @HostListener("dblclick") onClick(): void {
    this.flag = !this.flag;
    if (this.flag) {
      this.renderer.removeClass(this.el.nativeElement, "highlight")
      this.renderer.addClass(this.el.nativeElement , "highlight");
      // this.renderer.setStyle(this.el.nativeElement, "backgroundColor", "rgba(0, 0, 0, 0.07)");
    } else {
      this.renderer.removeClass(this.el.nativeElement, "highlight");
      // this.renderer.setStyle(this.el.nativeElement, "backgroundColor",  null);
    }
  }

  @HostListener("mouseenter") onEnter(): void {
    this.renderer.setStyle(this.el.nativeElement, "fontWeight", "bold");
  }
  @HostListener("mouseleave") onLeave(): void {
    this.renderer.setStyle(this.el.nativeElement, "fontWeight", null);
  }
}
