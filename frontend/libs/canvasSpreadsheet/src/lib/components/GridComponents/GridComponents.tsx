import { useContext, useEffect } from 'react';

import { Container } from '@pixi/react';

import { GridStateContext } from '../../context';
import { Cells } from '../Cells';
import { ColNumbers } from '../ColNumbers';
import { CornerRect } from '../CornerRect';
import { DNDSelection } from '../DNDSelection';
import { DottedSelection } from '../DottedSelection';
import { Errors } from '../Errors';
import { GridLines } from '../GridLines';
import { NoteLabels } from '../Notes';
import { Overrides } from '../Overrides';
import { RowNumbers } from '../RowNumbers';
import { ScrollBar } from '../ScrollBar';
import { Selection } from '../Selection';

export function GridComponents() {
  const { app, theme } = useContext(GridStateContext);

  useEffect(() => {
    if (!app?.renderer?.background) return;

    app.renderer.background.color = theme.grid.bgColor;
  }, [app, theme]);

  return (
    <Container sortableChildren>
      <GridLines />
      <RowNumbers />
      <CornerRect />
      <ColNumbers />
      <Cells />
      <Selection />
      <DNDSelection />
      <DottedSelection />
      <Overrides />
      <Errors />
      <NoteLabels />
      <ScrollBar />
    </Container>
  );
}
