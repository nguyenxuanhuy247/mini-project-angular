import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VtsResultModule } from '@ui-vts/ng-vts/result';

@Component({
  standalone: true,
  imports: [CommonModule, VtsResultModule],
  selector: 'app-bad-connection',
  template: `
    <vts-result
      vtsTemplate="bad-connection"
      vtsOkText="Trở về trang chủ"
      (vtsOnOk)="goHomePage()"
      vtsCancelText="Tải lại"
      (vtsOnCancel)="reloadPage()"
    >
      <div vts-result-subtitle>Error while connecting to server</div>
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
export class BadConnectionComponent {
  constructor(private router: Router) {}

  goHomePage(): void {
    this.router.navigate(['']);
  }

  reloadPage() {
    window.location.reload();
  }
}
