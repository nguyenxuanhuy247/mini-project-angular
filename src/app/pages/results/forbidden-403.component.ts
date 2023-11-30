import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VtsResultModule } from '@ui-vts/ng-vts/result';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, VtsResultModule],
  selector: 'app-forbidden',
  template: `
    <vts-result
      vtsTemplate="403"
      vtsOkText="Trở về trang chủ"
      (vtsOnOk)="goHomePage()"
    >
      <div vts-result-subtitle>Bạn không có quyền truy cập</div>
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
export class Forbidden403Component {
  constructor(private router: Router) {}

  goHomePage(): void {
    this.router.navigate(['']);
  }
}
