import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { VtsSpinModule } from '@ui-vts/ng-vts/spin';

@Component({
  standalone: true,
  imports: [CommonModule, VtsSpinModule],
  selector: 'vts-spin-basic',
  template: `
    <div class="spinner-container" *ngIf="isSpinning">
      <vts-spin vtsSimple [vtsSpinning]="isSpinning"></vts-spin>
    </div>
  `,
  styles: [
    `
      .spinner-container {
        height: 100vh;
        position: fixed;
        inset: 0;
        display: grid;
        place-items: center;
      }
    `,
  ],
})
export class VtsSpinBasicComponent {
  @Input() 'isSpinning': boolean = false;
}
