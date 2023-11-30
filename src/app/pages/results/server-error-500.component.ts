import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { VtsResultModule } from '@ui-vts/ng-vts/result';

@Component({
  standalone: true,
  imports: [CommonModule, VtsResultModule],
  selector: 'app-server-error-500',
  template: `
    <vts-result
      vtsTemplate="500"
      vtsOkText="Trở về trang chủ"
      vtsCancelText="Thử lại"
    >
      <div vts-result-title>Internal server error</div>
      <div vts-result-subtitle>Please retry later</div>
    </vts-result>
  `,
  styles: [
    `
      :host {
        min-height: 100vh;
        display: grid;
        place-items: center;

        div[vts-result-subtitle] {
          font-size: 1.6rem;
        }
      }
    `,
  ],
})
export class ServerError500Component {}
