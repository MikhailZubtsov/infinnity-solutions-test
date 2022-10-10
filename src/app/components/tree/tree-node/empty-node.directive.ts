import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[emptyNode]'
})
export class EmptyNodeDirective {
    @Input() set emptyNode(condition: boolean) {
        if(condition) {
            this.renderer.addClass(this.element.nativeElement, "tree-view__main__empty")
        }
        else {
            this.renderer.addClass(this.element.nativeElement, "tree-view__main__apps")
        }
    }
    constructor(private element: ElementRef, private renderer: Renderer2) {}
}