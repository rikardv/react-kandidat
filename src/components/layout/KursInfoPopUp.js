import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Loading from './Loading';
import getKursInfo from '../../connections/getKursInfo';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import Button from '@mui/material/Button';
import { PieChart, Pie, Cell, Label } from 'recharts';
import { useTheme } from '@emotion/react';

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  value,
  name,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill='white'
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline='central'
    >
      {name}
    </text>
  );
};

const columns = [
  { field: 'Startdatum', headerName: 'Startdatum' },
  { field: 'Registrerade', headerName: 'Registrerade' },
  { field: 'Avklarade', headerName: 'Avklarade' },
  { field: 'Betyg', headerName: 'Betyg' },
  {
    field: 'Betygsfördelning',
    headerName: 'Betygsfördelning',
    width: 210,
    renderCell: (params) => (
      <PieChart width={210} height={200}>
        <Pie
          data={params.row.Betygsfördelning.map((obj, indx) => ({
            ...obj,
            name: params.row.Betyg[indx],
            value: obj,
          }))}
          dataKey='value'
          nameKey='name'
          cx='50%'
          cy='50%'
          label
          labelLine={renderCustomizedLabel}
          outerRadius={40}
        ></Pie>
      </PieChart>
    ),
  },
  {
    field: 'Avhopp',
    headerName: 'Avhopp',
  },
];

export default function KursInfoPopUp({ kursKod, handleClose }) {
  const [table, setTable] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getKursInfo(kursKod).then((res) => {
      setTable(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <Dialog
      style={{ width: '100%' }}
      maxWidth={false}
      open
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        {kursKod ?? 'Ingen kurskod hittad..'}
      </DialogTitle>
      <DialogContent style={{ height: '80vh' }}>
        {loading ? (
          <Loading title='Laddar kursinformation....' />
        ) : (
          <DataGrid
            style={{ width: 1000 }}
            rows={table}
            columns={columns}
            checkboxSelection={false}
            pageSize={30}
            rowHeight={200}
            disableVirtualization
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
