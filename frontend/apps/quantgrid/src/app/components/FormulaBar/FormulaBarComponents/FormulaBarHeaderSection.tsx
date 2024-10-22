import { Input } from 'antd';
import cx from 'classnames';
import {
  KeyboardEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { formulaBarInput, shouldStopPropagation } from '@frontend/common';
import { SelectedCell, SelectedCellType } from '@frontend/spreadsheet';

import { AppContext, ProjectContext } from '../../../context';
import { useManualEditDSL } from '../../../hooks';
import {
  formulaBarInputClasses,
  formulaBarTextAreaClasses,
} from '../utils/common';

const tableFieldRegex = /^[^[\]]+\[[^[\]]+]$/;

export function FormulaBarHeaderSection() {
  const { formulaBarExpanded, editMode } = useContext(AppContext);
  const { selectedCell } = useContext(ProjectContext);
  const { renameTable, renameField } = useManualEditDSL();

  const inputRef = useRef<any>(null);
  const [inputFocused, setInputFocused] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [value, setValue] = useState('');

  const saveTableOrFieldName = useCallback(() => {
    if (
      !(
        selectedCell?.tableName &&
        selectedCell?.fieldName &&
        tableFieldRegex.test(value)
      )
    )
      return;

    const parsedValue = value
      .trim()
      .split('[')
      .map((v) => v.replaceAll(']', ''));
    const [tableName, fieldName] = parsedValue;
    const { tableName: oldTableName, fieldName: oldFieldName } = selectedCell;

    if (tableName === oldTableName && fieldName === oldFieldName) return;

    if (fieldName !== oldFieldName) {
      renameField(oldTableName, oldFieldName, fieldName);
    }
    if (tableName !== oldTableName) {
      renameTable(oldTableName, tableName);
    }
  }, [selectedCell, value, renameField, renameTable]);

  const saveTableName = useCallback(() => {
    if (selectedCell?.tableName) {
      renameTable(selectedCell.tableName, value);
    }
  }, [renameTable, selectedCell, value]);

  const saveValue = useCallback(() => {
    if (!selectedCell) return;

    switch (selectedCell.type) {
      case SelectedCellType.EmptyCell:
        return;
      case SelectedCellType.Table:
        saveTableName();
        break;
      case SelectedCellType.Field:
      case SelectedCellType.Cell:
      case SelectedCellType.Override:
        saveTableOrFieldName();
        break;
    }
  }, [saveTableOrFieldName, saveTableName, selectedCell]);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (!selectedCell) return;

      if (selectedCell.type === SelectedCellType.Table) {
        setValue(e.target.value);

        return;
      }

      if (
        [SelectedCellType.EmptyCell].includes(selectedCell.type) ||
        !inputRef.current
      )
        return;

      const ref =
        inputRef.current?.input || inputRef.current.resizableTextArea?.textArea;

      if (!ref) return;

      const selectionStart = ref.selectionStart;
      const inputValue = e.target.value;

      if (tableFieldRegex.test(inputValue)) {
        setValue(inputValue);
      } else {
        setValue(value);

        setTimeout(() => {
          ref.setSelectionRange(selectionStart, selectionStart);
        }, 0);
      }
    },
    [value, selectedCell]
  );

  const init = useCallback((selectedCell: SelectedCell | null) => {
    if (!selectedCell) {
      setValue('');
      setInputDisabled(true);

      return;
    }

    switch (selectedCell.type) {
      case SelectedCellType.EmptyCell:
        setValue(`${selectedCell.row}:${selectedCell.col}`);
        setInputDisabled(true);
        break;
      case SelectedCellType.Table:
        setValue(selectedCell.tableName || '');
        setInputDisabled(false);
        break;
      case SelectedCellType.Field:
      case SelectedCellType.Cell:
      case SelectedCellType.Override:
        setValue(`${selectedCell.tableName}[${selectedCell.fieldName}]`);
        setInputDisabled(false);
        break;
    }
  }, []);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (shouldStopPropagation(e)) {
        e.stopPropagation();
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        saveValue();

        return;
      }

      if (e.key === 'Escape') {
        init(selectedCell);

        return;
      }
    },
    [init, saveValue, selectedCell]
  );

  useEffect(() => {
    init(selectedCell);
  }, [init, selectedCell]);

  return (
    <div
      className={cx('h-full w-full flex', {
        'border-b border-b-strokeAccentTertiary':
          inputFocused ||
          editMode === 'rename_table' ||
          editMode === 'rename_field',
        'items-center': !formulaBarExpanded,
        'items-start': formulaBarExpanded,
      })}
    >
      {formulaBarExpanded ? (
        <Input.TextArea
          autoSize={true}
          className={formulaBarTextAreaClasses}
          disabled={inputDisabled}
          id={formulaBarInput}
          ref={inputRef}
          value={value}
          onBlur={() => {
            setInputFocused(false);
            saveValue();
          }}
          onChange={onChange}
          onFocus={() => setInputFocused(true)}
          onKeyDown={onKeyDown}
        />
      ) : (
        <Input
          className={formulaBarInputClasses}
          disabled={inputDisabled}
          id={formulaBarInput}
          ref={inputRef}
          value={value}
          onBlur={() => {
            setInputFocused(false);
            saveValue();
          }}
          onChange={onChange}
          onFocus={() => setInputFocused(true)}
          onKeyDown={onKeyDown}
        />
      )}
    </div>
  );
}