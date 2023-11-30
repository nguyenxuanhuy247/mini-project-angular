import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { VtsInputModule } from '@ui-vts/ng-vts/input';
import { VtsFormModule } from '@ui-vts/ng-vts/form';
import { VtsButtonModule } from '@ui-vts/ng-vts/button';
import { VtsTypographyModule } from '@ui-vts/ng-vts/typography';
import { VtsGridModule } from '@ui-vts/ng-vts/grid';
import { VtsCheckboxModule } from '@ui-vts/ng-vts/checkbox';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';
import { VtsImageModule } from '@ui-vts/ng-vts/image';

import { CommonModule } from '@angular/common';
import { LogoSrcDirective } from 'src/app/directives/logo-src.directive';
import { AuthService } from 'src/app/services/auth.service';
import { VtsSpinBasicComponent } from 'src/app/components/spinner/spinner.component';
import { Subscription } from 'rxjs';
import { VtsToastService } from '@ui-vts/ng-vts/toast';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    VtsFormModule,
    VtsInputModule,
    VtsButtonModule,
    VtsTypographyModule,
    VtsGridModule,
    VtsCheckboxModule,
    VtsIconModule,
    VtsGridModule,
    VtsImageModule,
    ReactiveFormsModule,
    LogoSrcDirective,
    VtsSpinBasicComponent,
  ],
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent {
  loginForm!: UntypedFormGroup;
  isShowPassword: boolean = false;
  inputPasswordType: string = 'password';
  isSpinning: boolean = false;
  loginSub: Subscription | undefined;

  constructor(
    private untypedForm: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router,
    private toast: VtsToastService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.untypedForm.group({
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(25),
          Validators.pattern('^(?=.*[A-Z])(?=.*[0-9]).*$'),
        ],
      ],
    });
  }

  onTogglePassword(): void {
    this.isShowPassword = !this.isShowPassword;
    this.inputPasswordType =
      this.isShowPassword === false ? 'password' : 'text';
  }

  submitForm() {
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }

    if (this.loginForm.status === 'VALID') {
      const loginData = { ...this.loginForm.value };

      this.isSpinning = true;
      this.loginSub = this.authService.logIn(loginData).subscribe({
        next: (data) => {
          this.isSpinning = false;
          this.loginForm.reset();
          this.router.navigate(['/home']);

          this.toast.create('success', 'Đăng nhập thành công', '');
        },
        error: (error) => {
          this.isSpinning = false;
        },
      });
    }
  }

  ngOnDestroy() {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }
}
