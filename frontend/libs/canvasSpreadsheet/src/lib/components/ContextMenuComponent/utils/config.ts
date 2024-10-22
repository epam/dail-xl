import { TotalType } from '@frontend/parser';

export const spreadsheetMenuKeys = {
  askAI: 'askAI',
  addOverride: 'AddOverride',
  removeOverride: 'RemoveOverride',
  editOverride: 'EditOverride',
  createDerivedTable: 'CreateDerivedTable',
  deleteField: 'DeleteField',
  deleteTable: 'DeleteTable',
  deleteRow: 'DeleteRow',
  editFormula: 'EditFormula',
  moveTable: 'MoveTable',
  cloneTable: 'CloneTable',
  toggleTableNameHeader: 'toggleTableNameHeader',
  toggleTableFieldsHeader: 'toggleTableFieldsHeader',
  renameField: 'RenameField',
  renameTable: 'RenameTable',
  swapLeft: 'SwapLeft',
  swapRight: 'SwapRight',
  increaseFieldWidth: 'IncreaseFieldWidth',
  decreaseFieldWidth: 'DecreaseFieldWidth',
  addKey: 'AddKey',
  removeKey: 'RemoveKey',
  addDimension: 'AddDimension',
  removeDimension: 'RemoveDimension',
  convertToChart: 'ConvertToChart',
  convertToTable: 'ConvertToTable',
  addChart: 'AddChart',
  addField: 'AddField',
  addRow: 'AddRow',
  insertFieldToLeft: 'InsertFieldToLeft',
  insertFieldToRight: 'InsertFieldToRight',
  addNote: 'addNote',
  editNote: 'editNote',
  removeNote: 'removeNote',
  openTableInEditor: 'OpenTableInEditor',
  openFieldInEditor: 'openFieldInEditor',
  openOverrideInEditor: 'openOverrideInEditor',
  flipTableToHorizontal: 'FlipTableToHorizontal',
  flipTableToVertical: 'FlipTableToVertical',
  sortAsc: 'SortAsc',
  sortDesc: 'SortDesc',
  clearSort: 'ClearSort',
  numFilter: 'NumFilter',
  textFilter: 'TextFilter',
  customTotal: 'CustomTotal',
  sumTotal: 'SumTotal',
  avgTotal: 'AvgTotal',
  countTotal: 'CountTotal',
  stdevTotal: 'StdevTotal',
  medianTotal: 'MedianTotal',
  modeTotal: 'ModeTotal',
  maxTotal: 'MaxTotal',
  minTotal: 'MinTotal',
  addTotal: 'AddTotal',
  editTotal: 'EditTotal',
  removeTotal: 'RemoveTotal',
  promoteRow: 'promoteRow',
  addFieldOrRow: 'addFieldOrRow',
  tableToFront: 'tableToFront',
  tableToBack: 'tableToBack',
  tableForward: 'tableForward',
  tableBackward: 'tableBackward',
};

type TotalItem = {
  key: string;
  label: string;
  type: TotalType;
  isCheckbox: boolean;
};
export const totalItems: TotalItem[] = [
  {
    key: spreadsheetMenuKeys.sumTotal,
    label: 'SUM',
    type: 'sum',
    isCheckbox: true,
  },
  {
    key: spreadsheetMenuKeys.avgTotal,
    label: 'AVERAGE',
    type: 'average',
    isCheckbox: true,
  },
  {
    key: spreadsheetMenuKeys.countTotal,
    label: 'COUNT',
    type: 'count',
    isCheckbox: true,
  },
  {
    key: spreadsheetMenuKeys.stdevTotal,
    label: 'STDEV',
    type: 'stdevs',
    isCheckbox: true,
  },
  {
    key: spreadsheetMenuKeys.medianTotal,
    label: 'MEDIAN',
    type: 'median',
    isCheckbox: true,
  },
  {
    key: spreadsheetMenuKeys.modeTotal,
    label: 'MODE',
    type: 'mode',
    isCheckbox: true,
  },
  {
    key: spreadsheetMenuKeys.maxTotal,
    label: 'MAX',
    type: 'max',
    isCheckbox: true,
  },
  {
    key: spreadsheetMenuKeys.minTotal,
    label: 'MIN',
    type: 'min',
    isCheckbox: true,
  },
  {
    key: spreadsheetMenuKeys.customTotal,
    label: 'CUSTOM',
    type: 'custom',
    isCheckbox: false,
  },
];
