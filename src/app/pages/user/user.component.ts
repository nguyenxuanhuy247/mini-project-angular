import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { VtsButtonModule } from '@ui-vts/ng-vts/button';
import { MainLayoutComponent } from 'src/app/shared/main-layout/main-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VtsTableModule } from '@ui-vts/ng-vts/table';
import { CommonModule } from '@angular/common';
import { VtsFormModule } from '@ui-vts/ng-vts/form';
import { VtsTagModule } from '@ui-vts/ng-vts/tag';
import { VtsSpaceModule } from '@ui-vts/ng-vts/space';
import { VtsDropDownModule } from '@ui-vts/ng-vts/dropdown';
import { VtsMenuModule } from '@ui-vts/ng-vts/menu';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';
import { VtsSelectModule } from '@ui-vts/ng-vts/select';
import { VtsTypographyModule } from '@ui-vts/ng-vts/typography';
import { AddNewDrawerComponent } from 'src/app/components/add-new-drawer/add-new-drawer.component';
import { VtsDrawerModule } from '@ui-vts/ng-vts/drawer';
import { VtsDatePickerModule } from '@ui-vts/ng-vts/date-picker';
import { UserService } from 'src/app/services/user.service';
import { VtsSpinBasicComponent } from 'src/app/components/spinner/spinner.component';
import { MemberModel } from 'src/app/shared/member.model';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  imports: [
    VtsButtonModule,
    MainLayoutComponent,
    VtsTableModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    VtsFormModule,
    VtsTagModule,
    VtsSpaceModule,
    VtsDropDownModule,
    VtsMenuModule,
    VtsIconModule,
    VtsSelectModule,
    VtsTypographyModule,
    VtsDrawerModule,
    VtsDatePickerModule,
    AddNewDrawerComponent,
    VtsSpinBasicComponent,
  ],
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  pageIndex = 1;
  isSpinning: boolean = false;
  isOpenEdit: boolean = false;
  allMembersArray: MemberModel[] = [];
  memberData: MemberModel | null = null;

  deleteMemberSub: Subscription | undefined;
  fetchAllMembersSub: Subscription | undefined;

  constructor(
    private userService: UserService,
    private cdf: ChangeDetectorRef
  ) {}

  sortFn = (k: string) => (item1: any, item2: any) =>
    item1[k] < item2[k] ? 1 : -1;

  ngOnInit(): void {
    this.isSpinning = true;
    this.fetchAllMembersSub = this.userService.fetchAllMembers().subscribe({
      next: (data) => {
        this.isSpinning = false;
        this.allMembersArray = data;
        this.cdf.detectChanges();
      },
      error: (error) => {
        this.isSpinning = false;
      },
    });
  }

  turnOnSpinnerAndFetchAllMembers(bool: true): void {
    this.isSpinning = bool;

    this.fetchAllMembersSub = this.userService.fetchAllMembers().subscribe({
      next: (data) => {
        this.isSpinning = false;
        this.allMembersArray = data;
        this.cdf.detectChanges();
      },
      error: (error) => {
        this.isSpinning = false;
      },
    });
  }

  onEditMember(memberData: MemberModel) {
    this.isOpenEdit = true;
    this.memberData = memberData;
  }

  onDeleteMember(id: string | undefined) {
    if (id) {
      this.isSpinning = true;
      // Delete member
      this.deleteMemberSub = this.userService.deleteMember(id).subscribe({
        next: () => {},
        error: (error) => {
          this.isSpinning = false;
        },
        complete: () => {
          // Fetch All Members
          this.fetchAllMembersSub = this.userService
            .fetchAllMembers()
            .subscribe({
              next: (data) => {
                this.isSpinning = false;
                this.allMembersArray = data;
                this.cdf.detectChanges();
              },
              error: (error) => {
                this.isSpinning = false;
              },
            });
        },
      });
    }
  }

  closeEditMemeber() {
    this.isOpenEdit = false;
    this.memberData = null;
  }

  ngOnDestroy(): void {
    if (this.deleteMemberSub) {
      this.deleteMemberSub.unsubscribe();
    }

    if (this.fetchAllMembersSub) {
      this.fetchAllMembersSub.unsubscribe();
    }
  }
}
