import { Component } from '@angular/core';
import { VtsButtonModule } from '@ui-vts/ng-vts/button';
import { MainLayoutComponent } from 'src/app/shared/main-layout/main-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VtsTableModule } from '@ui-vts/ng-vts/table';
import { ItemData } from 'src/app/shared/interface.model';
import { CommonModule } from '@angular/common';
import { VtsFormModule } from '@ui-vts/ng-vts/form';
import { VtsTagModule } from '@ui-vts/ng-vts/tag';
import { VtsSpaceModule } from '@ui-vts/ng-vts/space';
import { VtsDropDownModule } from '@ui-vts/ng-vts/dropdown';
import { VtsMenuModule } from '@ui-vts/ng-vts/menu';
import { VtsIconModule } from '@ui-vts/ng-vts/icon';
import { VtsSelectModule } from '@ui-vts/ng-vts/select';
import { VtsTypographyModule } from '@ui-vts/ng-vts/typography';
import { VtsDrawerModule } from '@ui-vts/ng-vts/drawer';
import { VtsDatePickerModule } from '@ui-vts/ng-vts/date-picker';

export function oneOf<T>(values: T[]): T {
  const idx = Math.floor(Math.random() * values.length);
  return values[idx];
}

export const names = [
  'Alisha Wallace',
  'Margaret Barnett',
  'Laurie Ross',
  'Sidney Farmer',
  'Saira Zuniga',
  'Talha Mathews',
  'Zakariya Mckee',
  'Amirah Francis',
  'Jose Pineda',
  'Findlay Spencer',
  'Ned Miller',
  'Emmie Wagner',
  'Allan Hall',
  'Cassandra Watson',
  'Sufyaan Taylor',
  'Rufus Washington',
  'Lorcan Booth',
  'Henry Galvan',
  'Harris Joseph',
  'Constance Hunter',
  'Sahar Payne',
  'Owais Boyd',
  'Ruth Gould',
  'Gabriel Bright',
  'Bernice Roth',
  'Nannie Sawyer',
  'Ismael Wiley',
  'Humza Holder',
  'Lillie Sutherland',
  'Anisa Dean',
];

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
  ],
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  pageIndex = 1;
  data = this.generateData();
  checked = false;

  sortFn = (k: string) => (item1: any, item2: any) =>
    item1[k] < item2[k] ? 1 : -1;

  generateData(): ReadonlyArray<ItemData> {
    const data = [];
    for (let i = 1; i <= 100; i++) {
      data.push({
        id: i.toString(),
        name: oneOf(names),
        email: `${oneOf(names)
          .toLocaleLowerCase()
          .replace(/\s/g, '')}@gmail.com`,
        birthday: '06/06/2000',
        marriagStatus: oneOf(['Độc thân', 'Đã kết hôn']),
      });
    }

    return data;
  }
}
