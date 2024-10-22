import {
  createContext,
  JSX,
  PropsWithChildren,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { AppTheme, GridData, GridTable } from '@frontend/common';
import { Application } from '@pixi/app';

import { defaultGridSizes, GridSizes } from '../constants';
import { useGridResize } from '../hooks';
import { fontNameScale } from '../setup';
import { getTheme } from '../theme';
import {
  GetCell,
  GridApi,
  GridCallbacks,
  SelectionEdges,
  SelectionOptions,
  Theme,
} from '../types';
import { getGridDimension } from '../utils';

type GridStateProps = {
  app: Application | null;
  apiRef: RefObject<GridApi>;
  data: GridData;
  gridContainerRef: RefObject<HTMLDivElement | null>;
  gridCallbacksRef: RefObject<GridCallbacks>;
  pointClickMode: boolean;
  themeName: AppTheme;
  tableStructure: GridTable[];
  zoom: number;
  columnSizes: Record<string, number>;
};

type GridStateContextActions = {
  getCell: GetCell;
  setCellValue: (col: number, row: number, value: string) => void;
  getBitmapFontName: (fontFamily: string, fontName: string) => string;
  setSelectionEdges: (
    edges: SelectionEdges | null,
    selectionOptions?: SelectionOptions
  ) => void;
  setDottedSelectionEdges: (edges: SelectionEdges | null) => void;
  setPointClickError: (error: boolean) => void;
  setRowNumberWidth: (newWidth: number) => void;
  setIsTableDragging: (isDragging: boolean) => void;
  setDNDSelection: (selection: SelectionEdges | null) => void;
};

type GridStateContextValues = {
  app: Application | null;
  gridApi: GridApi;
  gridCallbacks: GridCallbacks;
  gridWidth: number;
  gridHeight: number;
  fullHeight: number;
  fullWidth: number;
  gridSizes: GridSizes;
  isTableDragging: boolean;
  pointClickMode: boolean;
  pointClickError: boolean;
  dndSelection: SelectionEdges | null;
  selectionEdges: SelectionEdges | null;
  selectedTable: string | null;
  dottedSelectionEdges: SelectionEdges | null;
  tableStructure: GridTable[];
  theme: Theme;
  columnSizes: Record<string, number>;
};

export const GridStateContext = createContext<
  GridStateContextActions & GridStateContextValues
>({} as GridStateContextActions & GridStateContextValues);

export function GridStateContextProvider({
  app,
  apiRef,
  children,
  data,
  gridContainerRef,
  gridCallbacksRef,
  pointClickMode,
  tableStructure,
  themeName,
  zoom,
  columnSizes,
}: PropsWithChildren<GridStateProps>): JSX.Element {
  const [gridSizes, setGridSizes] = useState<GridSizes>(defaultGridSizes);

  const { gridWidth, gridHeight } = useGridResize({ gridContainerRef, app });

  const theme = useMemo(() => getTheme(themeName), [themeName]);

  const [fullHeight, setFullHeight] = useState(0);
  const [fullWidth, setFullWidth] = useState(0);
  const [selectionEdges, _setSelectionEdges] = useState<SelectionEdges | null>(
    null
  );
  const [dottedSelectionEdges, setDottedSelectionEdges] =
    useState<SelectionEdges | null>(null);
  const [pointClickError, setPointClickError] = useState(false);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [isTableDragging, setIsTableDragging] = useState(false);
  const [dndSelection, setDNDSelection] = useState<SelectionEdges | null>(null);

  const getCell = useCallback(
    (col: number, row: number) => {
      return data[row]?.[col];
    },
    [data]
  );

  const setCellValue = useCallback(
    (col: number, row: number, value: string) => {
      if (!data?.[row]?.[col]) return;

      data[row][col].value = value;
    },
    [data]
  );

  const getBitmapFontName = useCallback(
    (fontFamily: string, fontName: string) => {
      return `${fontFamily},${fontName},${fontNameScale}${zoom}`;
    },
    [zoom]
  );

  const setRowNumberWidth = useCallback(
    (newWidth: number) => {
      const updatedSizes = structuredClone(gridSizes);

      updatedSizes.rowNumber.width = newWidth;

      setGridSizes(updatedSizes);
    },
    [gridSizes]
  );

  const setSelectionEdges = useCallback(
    (edges: SelectionEdges | null, selectionOptions?: SelectionOptions) => {
      _setSelectionEdges(edges);

      if (selectionOptions?.selectedTable) {
        setSelectedTable(selectionOptions.selectedTable);
      } else if (selectedTable) {
        setSelectedTable(null);
      }

      if (!selectionOptions?.silent) {
        gridCallbacksRef?.current?.onSelectionChange?.(edges);
      }
    },
    [gridCallbacksRef, selectedTable]
  );

  useEffect(() => {
    const updatedSizes = Object.fromEntries(
      Object.entries(defaultGridSizes).map(([scope, currentScope]) => [
        scope,
        Object.fromEntries(
          Object.entries(currentScope).map(([param, size]) => [
            param,
            Math.max(1, Math.round(size * zoom)),
          ])
        ),
      ])
    ) as GridSizes;

    updatedSizes.edges = {
      col: defaultGridSizes.edges.col,
      row: defaultGridSizes.edges.row,
    };

    setGridSizes(updatedSizes);
  }, [zoom]);

  useEffect(() => {
    const { cell, edges } = gridSizes;
    const fixedColWidth = gridSizes.rowNumber.width;
    const fixedRowHeight = gridSizes.colNumber.height;

    const updatedWidth = getGridDimension(edges.col, cell.width, columnSizes);
    const updatedHeight = getGridDimension(edges.row, cell.height, {});

    setFullWidth(updatedWidth + fixedColWidth);
    setFullHeight(updatedHeight + fixedRowHeight);
  }, [columnSizes, gridSizes, theme, zoom]);

  const value = useMemo(
    () => ({
      app,
      dottedSelectionEdges,
      dndSelection,
      fullHeight,
      fullWidth,
      getBitmapFontName,
      getCell,
      gridApi: apiRef.current || ({} as GridApi),
      gridCallbacks: gridCallbacksRef.current || {},
      gridHeight,
      gridSizes,
      gridWidth,
      isTableDragging,
      pointClickError,
      pointClickMode,
      selectedTable,
      selectionEdges,
      setCellValue,
      setDottedSelectionEdges,
      setDNDSelection,
      setIsTableDragging,
      setPointClickError,
      setRowNumberWidth,
      setSelectionEdges,
      tableStructure,
      theme,
      columnSizes,
    }),
    [
      app,
      dottedSelectionEdges,
      dndSelection,
      fullHeight,
      fullWidth,
      getBitmapFontName,
      getCell,
      apiRef,
      gridCallbacksRef,
      gridHeight,
      gridSizes,
      gridWidth,
      isTableDragging,
      pointClickError,
      pointClickMode,
      selectedTable,
      selectionEdges,
      setCellValue,
      setRowNumberWidth,
      setSelectionEdges,
      tableStructure,
      theme,
      columnSizes,
    ]
  );

  return (
    <GridStateContext.Provider value={value}>
      {children}
    </GridStateContext.Provider>
  );
}