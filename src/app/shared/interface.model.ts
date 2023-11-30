import {
  VtsTableLayout,
  VtsTablePaginationPosition,
  VtsTablePaginationType,
  VtsTableSize,
} from '@ui-vts/ng-vts/table';

export interface ItemData {
  id: string;
  name: string;
  email: string;
  birthday: string;
  marriagStatus: string;
}

export interface Setting {
  bordered: boolean;
  loading: boolean;
  pagination: boolean;
  title: boolean;
  header: boolean;
  footer: boolean;
  expandable: boolean;
  checkbox: boolean;
  fixHeader: boolean;
  noResult: boolean;
  ellipsis: boolean;
  size: VtsTableSize;
  tableScroll: string;
  tableLayout: VtsTableLayout;
  position: VtsTablePaginationPosition;
  paginationType: VtsTablePaginationType;
  stripe: boolean;
  rounded: boolean;
  outline: boolean;
  mini: boolean;
  simple: boolean;
  sizeChanger: boolean;
  quickJumper: boolean;
}
