import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { VtsSpinModule } from '@ui-vts/ng-vts/spin';

@Component({
  standalone: true,
  imports: [CommonModule, VtsSpinModule],
  selector: 'vts-spin-inside',
  template: `
    <div class="container" [ngStyle]="{ width: '600px' }" *ngIf="isSpinning">
      <vts-spin vtsSimple></vts-spin>
    </div>
  `,
  styles: [
    `
      .container {
        position: absolute;
        inset: 0;
        left: auto;
        background: rgba(0, 0, 0, 0.1);
        z-index: 10000;
        display: grid;
        place-items: center;
      }
    `,
  ],
})
export class VtsSpinInsideComponent implements OnChanges {
  @Input() 'width': number;
  @Input() 'isSpinning': boolean;
  containerWidth: string = '600px';

  ngOnChanges(changes: SimpleChanges) {
    if (changes.width) {
      this.containerWidth = `${changes.width?.currentValue}px`;
    }
  }
}
