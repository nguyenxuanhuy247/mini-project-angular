import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { VtsResultModule } from '@ui-vts/ng-vts/result';
import { VtsSpaceModule } from '@ui-vts/ng-vts/space';

@Component({
  standalone: true,
  imports: [VtsResultModule, VtsSpaceModule],
  selector: 'app-not-found-404',
  template: `
    <div class="not-found-404">
      <vts-result
        vtsTemplate="404"
        vtsOkText="Trở về trang chủ"
        (vtsOnOk)="goHomePage()"
        vtsCancelText="Tải lại"
        (vtsOnCancel)="reloadPage()"
      >
        <div vts-result-title>Error while connecting to server</div>
        <div vts-result-subtitle>Please retry again</div>
        <div vts-result-content>
          <b><p>Potential causes:</p></b>
          <vts-space vtsPreset="2" vtsDirection="vertical">
            <div *vtsSpaceItem>😢 Network connection is interrupted</div>
            <div *vtsSpaceItem>😢 Check internet or proxy</div>
          </vts-space>
        </div>
      </vts-result>
    </div>
  `,
  styles: [
    `
      :host {
        min-height: 100vh;
        display: grid;
        place-items: center;

        vts-result {
          width: 600px;
          max-width: calc(100% - 24px);
        }
      }
    `,
  ],
})
export class NotFound404Component {
  constructor(private router: Router, private route: ActivatedRoute) {}

  goHomePage(): void {
    this.router.navigate(['']);
  }

  reloadPage() {
    window.location.reload();
  }
}
