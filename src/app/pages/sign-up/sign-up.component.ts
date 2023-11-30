import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { VtsButtonModule } from '@ui-vts/ng-vts/button';
import { VtsFormModule } from '@ui-vts/ng-vts/form';
import { VtsGridModule } from '@ui-vts/ng-vts/grid';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';
import { VtsImageModule } from '@ui-vts/ng-vts/image';
import { VtsInputModule } from '@ui-vts/ng-vts/input';
import { VtsSelectModule } from '@ui-vts/ng-vts/select';
import { VtsToastService } from '@ui-vts/ng-vts/toast';
import { VtsTypographyModule } from '@ui-vts/ng-vts/typography';
import { Subscription } from 'rxjs';
import { VtsSpinBasicComponent } from 'src/app/components/spinner/spinner.component';

import { LogoSrcDirective } from 'src/app/directives/logo-src.directive';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    VtsFormModule,
    VtsInputModule,
    VtsSelectModule,
    VtsButtonModule,
    ReactiveFormsModule,
    VtsTypographyModule,
    VtsGridModule,
    VtsImageModule,
    VtsIconModule,
    LogoSrcDirective,
    VtsSpinBasicComponent,
  ],
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  signupForm!: UntypedFormGroup;
  isShowPassword: boolean = false;
  inputPasswordType: string = 'password';
  isShowCheckPassword: boolean = false;
  inputCheckPasswordType: string = 'password';
  isSpinning: boolean = false;
  signupSub: Subscription | undefined;

  constructor(
    private untypedForm: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router,
    private toast: VtsToastService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.untypedForm.group({
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
      checkPassword: [null, [Validators.required, this.checkPasswordValidator]],
    });

    console.log('SUBSCRIPTION - ngOnInit - this.signupSub', this.signupSub);
  }

  onTogglePassword() {
    this.isShowPassword = !this.isShowPassword;
    this.inputPasswordType =
      this.isShowPassword === false ? 'password' : 'text';
  }

  onToggleCheckPassword() {
    this.isShowCheckPassword = !this.isShowCheckPassword;
    this.inputCheckPasswordType =
      this.isShowCheckPassword === false ? 'password' : 'text';
  }

  checkPasswordValidator = (
    control: UntypedFormControl
  ): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.signupForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  submitForm(): void {
    for (const i in this.signupForm.controls) {
      this.signupForm.controls[i].markAsDirty();
      this.signupForm.controls[i].updateValueAndValidity();
    }

    if (this.signupForm.status === 'VALID') {
      const signupData = { ...this.signupForm.value };
      delete signupData.checkPassword;

      this.isSpinning = true;
      this.signupSub = this.authService.signUp(signupData).subscribe({
        next: (data) => {
          this.isSpinning = false;
          this.signupForm.reset();
          this.router.navigate(['/log-in']);

          this.toast.create(
            'success',
            'Đăng ký thành công',
            'Vui lòng đăng nhập tài khoản'
          );
        },
        error: (error) => {
          this.isSpinning = false;
        },
      });

      console.log('SUBSCRIPTION - submitForm - this.signupSub', this.signupSub);
    }
  }

  ngOnDestroy() {
    console.log(
      'SUBSCRIPTION - ngOnDestroy - this.signupSub - 1111',
      this.signupSub
    );
    if (this.signupSub) {
      console.log(
        'SUBSCRIPTION - ngOnDestroy - this.signupSub - 2222',
        this.signupSub
      );
      this.signupSub.unsubscribe();
      console.log(
        'SUBSCRIPTION - ngOnDestroy - this.signupSub - 3333',
        this.signupSub
      );
    }
  }
}
