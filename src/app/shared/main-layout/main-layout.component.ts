import { Component, OnDestroy, OnInit } from '@angular/core';
import { VtsLayoutModule } from '@ui-vts/ng-vts/layout';
import { VtsBreadCrumbModule } from '@ui-vts/ng-vts/breadcrumb';
import { VtsMenuModule } from '@ui-vts/ng-vts/menu';
import { CommonModule } from '@angular/common';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';
import { VtsTypographyModule } from '@ui-vts/ng-vts/typography';
import { VtsSpaceModule } from '@ui-vts/ng-vts/space';
import { VtsButtonModule } from '@ui-vts/ng-vts/button';
import { RouterModule } from '@angular/router';
import { LogoSrcDirective } from 'src/app/directives/logo-src.directive';
import { AuthService } from 'src/app/services/auth.service';
import { VtsSpinBasicComponent } from 'src/app/components/spinner/spinner.component';
import { Subscription } from 'rxjs';
import { UserData } from '../auth-user.model';
import { GetUsernamePipe } from 'src/app/pipes/email-to-username.pipe';
import { VtsToastService } from '@ui-vts/ng-vts/toast';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    VtsLayoutModule,
    VtsBreadCrumbModule,
    VtsMenuModule,
    CommonModule,
    VtsIconModule,
    VtsTypographyModule,
    VtsSpaceModule,
    VtsButtonModule,
    LogoSrcDirective,
    VtsSpinBasicComponent,
    GetUsernamePipe,
  ],
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  loginStatus: boolean = false;
  isSpinning: boolean = false;
  userData: UserData;
  deleteAccountSub: Subscription | undefined;
  deleteDatabaseSub: Subscription | undefined;
  loginStatusSub: Subscription | undefined;

  constructor(
    private authService: AuthService,
    private toast: VtsToastService
  ) {}

  ngOnInit(): void {
    this.loginStatus = this.authService.loginStatus;
    this.userData = this.authService.userData;

    this.loginStatusSub = this.authService.login.subscribe({
      next: (bool: boolean) => {
        this.loginStatus = bool;
      },
    });
  }

  logOut(): void {
    this.authService.logOut();
  }

  deleteAccount(): void {
    const verify = confirm('Bạn có chắc chắn muốn xóa tài khoản');

    if (!verify) {
      return;
    }

    this.isSpinning = true;
    this.deleteAccountSub = this.authService.deleteAccount().subscribe({
      next: (data) => {
        this.deleteDatabaseSub = this.authService.deleteDatabase().subscribe({
          next: (data) => {
            this.toast.create('success', 'Xóa tài khoản thành công', '');
            this.isSpinning = false;
          },
          error: (error) => (this.isSpinning = false),
        });
      },
      error: (error) => (this.isSpinning = false),
    });
  }

  ngOnDestroy() {
    if (this.deleteAccountSub) {
      this.deleteAccountSub.unsubscribe();
    }

    if (this.deleteDatabaseSub) {
      this.deleteDatabaseSub.unsubscribe();
    }

    if (this.loginStatusSub) {
      this.loginStatusSub.unsubscribe();
    }
  }
}
