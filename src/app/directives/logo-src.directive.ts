import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { Images } from '../shared/images.model';

@Directive({
  standalone: true,
  selector: '[appLogoSrc]',
})
export class LogoSrcDirective implements OnInit, OnChanges {
  @Input('appLogoSrc') customWidth: string = '';
  @HostBinding('style.width') 'width': string = '120px';

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges) {
    this.width = changes['customWidth'].currentValue || '120px';
  }

  ngOnInit(): void {
    this.renderer.setAttribute(
      this.elRef.nativeElement,
      'src',
      Images.getLogoBase64
    );
  }
}
