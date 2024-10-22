import { MenuProps } from 'antd';

import {
  OverrideRows,
  OverrideValue,
  ParsedTable,
  TotalType,
} from '@frontend/parser';

import { ColumnDataType, CompilationError, PeriodSeries } from '../services';

export type FormulasContextMenuKeyData = {
  insertFormula?: string;
  tableName?: string;
  type?: 'derived' | 'size' | 'copy';
};

export type MenuItem = Required<MenuProps>['items'][number];
export type MenuItemProps = {
  label: React.ReactNode;
  key?: React.Key | null;
  icon?: React.ReactNode;
  children?: MenuItem[];
  disabled?: boolean;
  tooltip?: string;
  type?: 'group';
  shortcut?: string;
  stopPropagationOnClick?: boolean;
  onClick?: () => void;
};

export type GridViewport = {
  startRow: number;
  endRow: number;
  startCol: number;
  endCol: number;
};

export type CachedViewport = {
  requestedRows?: number[][];
  startRow: number;
  endRow: number;
  fields?: Set<string>;
};

export type CachedViewports = {
  [tableName: string]: CachedViewport;
};

export type SelectedChartKey = {
  tableName: string;
  fieldName: string;
  key: string;
};

export type TablesData = {
  [tableName: string]: TableData;
};

export type TotalData = {
  [columnName: string]: Record<number, string>;
};

export interface DiffData {
  table: boolean;
  fields: string[];
  overrides: OverrideRows;
}

export type TableData = {
  chunks: { [index: number]: ColumnChunk };
  // when table has new definition -> should put all data to cache and showing it, until new data come
  fallbackChunks: { [index: number]: ColumnChunk };

  total: TotalData;

  table: ParsedTable;
  dynamicFields?: string[];
  isDynamicFieldsRequested: boolean;

  diff: DiffData | undefined;

  maxKnownRowIndex: number;

  fieldErrors: { [columnName: string]: string };

  nestedColumnNames: Set<string>;

  columnReferenceTableNames: { [columnName: string]: string };
  types: { [columnName: string]: ColumnDataType };
};

export type ColumnChunk = { [columnName: string]: string[] };

export type ChartsData = {
  [tableName: string]: ChartData;
};

export type ChartData = {
  [columnName: string]: PeriodSeries[];
};

export type RuntimeError = CompilationError;

export enum AppTheme {
  ThemeLight = 'theme-light',
  ThemeDark = 'theme-dark',
  ThemeDarkMixed = 'theme-dark-mixed',
}

// Spreadsheet types

export type ChartType = 'line' | 'tabular';
export type FieldSortOrder = 'asc' | 'desc' | null;
export type GridNumericFilter = {
  operator: string;
  value: string;
};
export type GridListFilter = {
  value: string;
  isSelected: boolean;
};

export type GridTable = {
  startRow: number;
  startCol: number;
  endCol: number;
  endRow: number;
  tableName: string;
  chartType?: ChartType;
  isTableNameHeaderHidden: boolean;
  isTableFieldsHeaderHidden: boolean;
  isTableHorizontal: boolean;
  totalSize: number;
  hasKeys: boolean;
  isManual: boolean;
  isNewAdded: boolean;
};

export type GridField = {
  fieldName: string;
  expression: string;
  isKey: boolean;
  isDim: boolean;
  isNested: boolean;
  isPeriodSeries: boolean;
  isDynamic: boolean;
  isFiltered: boolean;
  numericFilter?: GridNumericFilter;
  totalFieldTypes?: TotalType[];
  sort: FieldSortOrder;
  isFieldUsedInSort: boolean;
  type: ColumnDataType;
  referenceTableName?: string;
  note?: string;
  hasError: boolean;
  errorMessage?: string;
  isChanged: boolean;
};

export type GridCell = {
  table?: GridTable;
  field?: GridField;
  value?: string;

  hasError?: boolean;
  errorMessage?: string;

  totalIndex?: number;
  totalType?: TotalType;
  totalExpression?: string;

  row: number;
  col: number;
  dataIndex?: number;

  overrideIndex?: number;
  overrideValue?: OverrideValue;
  isOverride?: boolean;
  isOverrideChanged?: boolean;

  isUrl?: boolean;

  isTableHeader?: boolean;
  isFieldHeader?: boolean;

  zIndex?: number;

  isPlaceholder?: boolean;
  isRightAligned?: boolean;

  startCol: number;
  endCol: number;
};

export type RowData = { [col: string]: GridCell };

export type GridData = {
  [row: string]: RowData;
};

export type CellPlacement = {
  row: number;
  col: number;
};

export type GridChart = {
  tableName: string;
  startRow: number;
  startCol: number;
  endCol: number;
  endRow: number;

  chartType: ChartType;
  fieldKeys: string[];

  availableKeys: Record<string, string[]>;

  selectedKeys: Record<string, string>;
};

export type FormulaBarMode = 'formula' | 'value';

export type PointClickModeSource = 'cell-editor' | 'formula-bar' | null;
export type GetCompletionFunction = (body: string) => Promise<Response>;

export type TableArrangeType = 'forward' | 'backward' | 'front' | 'back';
