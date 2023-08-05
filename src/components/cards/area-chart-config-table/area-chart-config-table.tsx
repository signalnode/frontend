import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { AreaChartConfigTableRow } from './area-chart-config-table-row';
import { useEffect, useState } from 'react';
import { AreaChartAxis } from '../../charts/area-chart';

type AreaChartConfigTable = { properties: AreaChartConfigTableProperty[]; rows?: AreaChartAxis[]; onRowChange: (row: AreaChartAxis, index: number) => void };
export type AreaChartConfigTableProperty = { group?: string; value: string };

const randomHexColor = () => '#' + Math.floor(Math.random() * parseInt('ffffff', 16)).toString(16);

export function AreaChartConfigTable({ rows, properties, onRowChange }: AreaChartConfigTable) {
  const [newRow, setNewRow] = useState<AreaChartAxis>({ name: '', fill: randomHexColor(), stroke: randomHexColor() });
  const onPropertySelect = (name: string, row: AreaChartAxis, index: number) => onRowChange({ name, fill: row.fill, stroke: row.stroke }, index);
  const onFillColorSelect = (color: string, row: AreaChartAxis, index: number) => onRowChange({ ...row, fill: color }, index);
  const onStrokeColorSelect = (color: string, row: AreaChartAxis, index: number) => onRowChange({ ...row, stroke: color }, index);

  const getOptionLabel = (property: AreaChartConfigTableProperty) => property.value;

  const renderTableRows = () =>
    rows?.map((row, i) => (
      <AreaChartConfigTableRow
        key={row.name}
        property={row.name}
        properties={properties}
        fillColor={row.fill}
        strokeColor={row.stroke}
        getOptionLabel={getOptionLabel}
        onPropertySelect={(property) => onPropertySelect(property, row, i)}
        onFillColorSelect={(color) => onFillColorSelect(color, row, i)}
        onStrokeColorSelect={(color) => onStrokeColorSelect(color, row, i)}
      />
    ));

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Property</TableCell>
            <TableCell align="right">Fill Color</TableCell>
            <TableCell align="right">Stroke Color</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {renderTableRows()}
          <AreaChartConfigTableRow
            property={newRow.name}
            properties={properties}
            fillColor={newRow.fill}
            strokeColor={newRow.stroke}
            getOptionLabel={getOptionLabel}
            groupBy={(option) => option.group!}
            onPropertySelect={(property) =>
              setNewRow((newRow) => {
                onPropertySelect(property, newRow, -1);
                return { name: '', fill: randomHexColor(), stroke: randomHexColor() };
              })
            }
            onFillColorSelect={() => undefined}
            onStrokeColorSelect={() => undefined}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
}
