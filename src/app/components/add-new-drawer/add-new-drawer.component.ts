import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { VtsButtonModule } from '@ui-vts/ng-vts/button';
import { VtsFormModule } from '@ui-vts/ng-vts/form';
import { VtsInputModule } from '@ui-vts/ng-vts/input';
import { VtsSelectModule } from '@ui-vts/ng-vts/select';
import { VtsDrawerModule } from '@ui-vts/ng-vts/drawer';
import { VtsDatePickerModule } from '@ui-vts/ng-vts/date-picker';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';
import { VtsSpaceModule } from '@ui-vts/ng-vts/space';
import { VtsPanelModule } from '@ui-vts/ng-vts/panel';
import { VtsRadioModule } from '@ui-vts/ng-vts/radio';
import { VtsTypographyModule } from '@ui-vts/ng-vts/typography';
import { VtsCalendarModule } from '@ui-vts/ng-vts/calendar';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { VtsSpinInsideComponent } from '../spinner/inside-spinner.component';
import { MemberModel } from 'src/app/shared/member.model';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    VtsFormModule,
    VtsInputModule,
    VtsSelectModule,
    VtsButtonModule,
    VtsDrawerModule,
    VtsDatePickerModule,
    VtsIconModule,
    VtsSpaceModule,
    VtsPanelModule,
    VtsRadioModule,
    VtsTypographyModule,
    VtsCalendarModule,
    ReactiveFormsModule,
    VtsSpinInsideComponent,
  ],
  selector: 'app-add-new-drawer',
  templateUrl: './add-new-drawer.component.html',
  styleUrls: ['./add-new-drawer.component.scss'],
})
export class AddNewDrawerComponent implements OnInit, OnChanges {
  @Output() spinnerAndFetch = new EventEmitter<true>();
  @Output() closeEdit = new EventEmitter<boolean>();
  @Input() openEdit: boolean;
  @Input() memberData: MemberModel | null;

  visible = false;
  value: Date | null = null;
  marriagStatus: string = 'Single';
  width: number = 600;
  isSpinning: boolean = false;

  createNewMemberSub: Subscription | undefined;
  editMemberSub: Subscription | undefined;

  memberForm: UntypedFormGroup;

  constructor(
    private untypedForm: UntypedFormBuilder,
    private userService: UserService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    this.visible = changes?.openEdit.currentValue;
    const memberData = { ...changes.memberData.currentValue };

    delete memberData.id;

    if (this.memberForm && memberData) {
      this.memberForm.patchValue({ ...memberData });
    }
  }

  ngOnInit(): void {
    this.memberForm = this.untypedForm.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      address: [null, [Validators.required]],
      marriageStatus: [null, [Validators.required]],
    });
  }

  open(): void {
    this.visible = true;
    this.memberForm.reset();
  }

  close(): void {
    this.visible = false;
    this.closeEdit.emit();
  }

  print(e: Date) {
    this.value = e;
    console.log(e);
  }

  onSubmit(): void {
    for (const i in this.memberForm.controls) {
      this.memberForm.controls[i].markAsDirty();
      this.memberForm.controls[i].updateValueAndValidity();
    }

    if (this.memberForm.status !== 'VALID') {
      return;
    }

    const memberData = this.memberForm.value;
    this.isSpinning = true;

    if (this.memberData) {
      // Edit member
      const id = this.memberData.id as string;
      const memberDataReq = { ...memberData };

      this.editMemberSub = this.userService
        .editMember(id, memberDataReq)
        .subscribe({
          next: (data) => {
            this.memberForm.reset();
            this.isSpinning = false;
            this.visible = false;
            this.closeEdit.emit();

            this.spinnerAndFetch.emit(true);
          },
        });
    } else {
      // Create member
      this.createNewMemberSub = this.userService
        .createNewMember(memberData)
        .subscribe({
          next: (data) => {
            this.memberForm.reset();
            this.isSpinning = false;
            this.visible = false;

            this.spinnerAndFetch.emit(true);
          },
        });
    }
  }

  ngOnDestroy(): void {
    if (this.createNewMemberSub) {
      this.createNewMemberSub.unsubscribe();
    }

    if (this.editMemberSub) {
      this.editMemberSub.unsubscribe();
    }
  }
}
