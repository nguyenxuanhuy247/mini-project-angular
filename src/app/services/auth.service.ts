import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';
import {
  StoreUserModel,
  UserData,
  UserReqModel,
  UserResModel,
} from '../shared/auth-user.model';
import { VtsToastService } from '@ui-vts/ng-vts/toast';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginStatus: boolean = false;
  tokenExpirationTimer: any;
  isAdmin: boolean = false;
  username: string = '';
  token: string = '';
  userData: UserData;

  login = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private toast: VtsToastService,
    private router: Router
  ) {}

  signUp(user: UserReqModel): Observable<UserResModel> {
    return this.http
      .post<UserResModel>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAIdpP8D0p2ZGa3o4xG1I_Up1DPCBLtR0g`,
        { email: user.email, password: user.password, returnSecureToken: false }
      )
      .pipe(catchError((error) => this.handleError(error)));
  }

  logIn(user: UserReqModel): Observable<UserResModel> {
    return this.http
      .post<UserResModel>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAIdpP8D0p2ZGa3o4xG1I_Up1DPCBLtR0g',
        { email: user.email, password: user.password, returnSecureToken: true }
      )
      .pipe(
        tap((resData) => {
          this.loginStatus = true;

          const expirationData = new Date(
            new Date().getTime() + +resData.expiresIn * 1000
          );
          const user = new StoreUserModel(
            resData.email,
            resData.localId,
            resData.idToken,
            expirationData
          );
          this.userData = user.userData;
          this.username = user.getUsername();
          this.isAdmin = user.checkAdmin();
          this.token = resData.idToken;
          localStorage.setItem('userData', JSON.stringify(user));
          this.login.next(this.loginStatus);

          // Set timer to log out
          this.autoLogOut(+resData.expiresIn * 1000);
        }),
        catchError((error) => this.handleError(error))
      );
  }

  logOut() {
    this.loginStatus = false;
    this.token = '';
    this.login.next(this.loginStatus);
    localStorage.removeItem('userData');
    this.router.navigate(['/log-in']);

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
  }

  autoLogIn() {
    const userDataInLocalStorage: UserData = JSON.parse(
      localStorage.getItem('userData') || '{}'
    );

    if (userDataInLocalStorage) {
      const user = new StoreUserModel(
        userDataInLocalStorage.email,
        userDataInLocalStorage.id,
        userDataInLocalStorage._token,
        new Date(userDataInLocalStorage._tokenExpirationDate)
      );

      if (user.token) {
        this.loginStatus = true;
        this.token = user.token;
        this.userData = user.userData;
        this.isAdmin = user.checkAdmin();
        this.username = user.getUsername();
        this.login.next(this.loginStatus);

        const timeRemaining =
          new Date(userDataInLocalStorage._tokenExpirationDate).getTime() -
          new Date().getTime();

        this.autoLogOut(timeRemaining);
      } else {
        this.logOut();
      }
    }
  }

  autoLogOut(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(
      () => this.logOut(),
      expirationDuration
    );
  }

  deleteAccount(): Observable<{ kind: string }> {
    return this.http
      .post<{ kind: string }>(
        'https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyAIdpP8D0p2ZGa3o4xG1I_Up1DPCBLtR0g',
        { idToken: this.token }
      )
      .pipe(catchError((error) => this.handleError(error)));
  }

  deleteDatabase(): Observable<null> {
    return this.http
      .delete<null>(
        `https://mini-project-angular-8888-default-rtdb.asia-southeast1.firebasedatabase.app/${this.username}.json`
      )
      .pipe(
        tap(() => {
          this.logOut();
        }),
        catchError((error) => this.handleError(error))
      );
  }

  // Handle Error when Log In and Sign
  private handleError(error: HttpErrorResponse) {
    let message;
    this.loginStatus = false;

    if (!error?.error?.error) {
      return throwError(message);
    }

    switch (error.error.error.message) {
      // Sign Up
      case 'EMAIL_EXISTS':
        message = 'Email đã được sử dụng';
        break;
      case 'OPERATION_NOT_ALLOWED':
        message = 'Đăng nhập bằng mật khẩu bị vô hiệu hóa';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        message =
          'Chúng tôi đã chặn tất cả các yêu cầu từ thiết bị này do hoạt động bất thường. Thử lại sau.';
        break;
      // Log In
      case 'EMAIL_NOT_FOUND':
        message = 'Không có hồ sơ người dùng tương ứng với email';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        message = 'Email hoặc Mật khẩu không hợp lệ';
        break;
      case 'USER_DISABLED':
        message = 'Tài khoản người dùng đã bị quản trị viên vô hiệu hóa';
        break;
      case 'API key not valid. Please pass a valid API key.':
        message = 'Vui lòng kiểm tra lại GOOGLE API KEY';
        break;
      // Delete Account
      case 'USER_NOT_FOUND':
        message = 'Không có hồ sơ người dùng cần xóa';
        break;
      case 'INVALID_ID_TOKEN':
        message =
          'Thông tin xác thực của người dùng không còn hợp lệ. Người dùng phải đăng nhập lại.';
        break;
      case 'CREDENTIAL_TOO_OLD_LOGIN_AGAIN':
        message = 'Người dùng cần đăng nhập lại để xóa tài khoản';
        this.logOut();
        break;
      default:
        message = 'Xảy ra lỗi! Vui lòng thử lại';
    }

    this.toast.create('error', message, '');

    return throwError(message);
  }
}
