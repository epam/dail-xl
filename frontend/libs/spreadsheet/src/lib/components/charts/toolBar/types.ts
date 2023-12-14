import { TableChunkData, TableData } from '@frontend/common';

import { GridChart } from '../../../grid';
import { ChartConfig } from '../types';

export type ToolBarProps = {
  chartConfig: ChartConfig;
  charts?: GridChart[];
  chartKeys: TableData;
  isHidden: boolean;
  moveMode: boolean;
  zoom: number;
  onLoadMoreKeys: (tableName: string, fieldName: string) => void;
  onSelectKey: (tableName: string, fieldName: string, key: string) => void;
};

export type ToolBarSelectProps = {
  keyName: string;
  zoom: number;
  chartConfig: ChartConfig;
  charts?: GridChart[];
  chartKeys: TableChunkData['chunks'] | null;
  onLoadMoreKeys: (tableName: string, fieldName: string) => void;
  onSelectKey: (tableName: string, fieldName: string, key: string) => void;
};
