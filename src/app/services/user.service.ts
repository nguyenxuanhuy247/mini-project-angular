import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  tap,
  throwError,
} from 'rxjs';
import {
  MemberModel,
  PostMemberResFromFirebaseModel,
} from '../shared/member.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { VtsToastService } from '@ui-vts/ng-vts/toast';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public username: string = this.getUsername();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private toast: VtsToastService
  ) {}

  getUsername() {
    const userData = this.authService.userData;
    const parts = userData?.email.split('@');
    return parts[0];
  }

  fetchAllMembers(): Observable<MemberModel[]> {
    return this.http
      .get<MemberModel[]>(
        `https://mini-project-angular-8888-default-rtdb.asia-southeast1.firebasedatabase.app/${this.username}.json`
      )
      .pipe(
        map((resData: any) => {
          let memberArray: MemberModel[] = [];

          for (let key in resData) {
            const newMember = { id: key, ...resData[key] };
            memberArray.push(newMember);
          }
          return memberArray;
        }),
        catchError(this.handleError)
      );
  }

  createNewMember(member: MemberModel) {
    return this.http
      .post<PostMemberResFromFirebaseModel>(
        `https://mini-project-angular-8888-default-rtdb.asia-southeast1.firebasedatabase.app/${this.username}.json`,
        {
          name: member.name,
          email: member.email,
          address: member.address,
          marriageStatus: member.marriageStatus,
        }
      )
      .pipe(catchError(this.handleError));
  }

  editMember(id: string, memberData: MemberModel) {
    return this.http
      .put<MemberModel>(
        `https://mini-project-angular-8888-default-rtdb.asia-southeast1.firebasedatabase.app/${this.username}/${id}.json`,
        memberData
      )
      .pipe(catchError(this.handleError));
  }

  deleteMember(id: string) {
    return this.http
      .delete<null>(
        `https://mini-project-angular-8888-default-rtdb.asia-southeast1.firebasedatabase.app/${this.username}/${id}.json`
      )
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    if (error.error.error) {
      this.toast.create(
        'error',
        'Xảy ra lỗi! Vui lòng thử lại.',
        error.error.error
      );

      return throwError(error.error.error);
    } else {
      return throwError('');
    }
  }
}
