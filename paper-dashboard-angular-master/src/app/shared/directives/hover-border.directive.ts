import { Directive, Input, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appHoverBorder]'
})
export class HoverBorderDirective {
  
  @Input()
  private couleur: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }
  
  @HostListener('mouseenter')
  onMouseEnter() {
    this.renderer.addClass(this.el.nativeElement, 'border');
    this.renderer.addClass(this.el.nativeElement, 'border-'+this.couleur);
  }
  
  @HostListener('mouseleave')
  onMouseLeave() {
   this.renderer.removeClass(this.el.nativeElement, 'border');
   this.renderer.removeClass(this.el.nativeElement, 'border-' + this.couleur);
  }

}
