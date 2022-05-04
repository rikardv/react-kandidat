import React, { useEffect, useState } from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts';
import { useTheme, Card, CardContent, Typography } from '@mui/material';
import { Info } from './Help';

const CustomPieChart = ({ title, total, under, info }) => {
  const theme = useTheme();
  const COLORS = [theme.palette.success.light, theme.palette.error.main];

  return (
    <Card style={{ width: '35%' }}>
      <Info text={info}/>
      <CardContent>
        <Typography variant='h2' fontWeight='medium' align='center'>
          {title}
        </Typography>
        <ResponsiveContainer height={200} width='100%'>
          <PieChart>
            <Pie
              data={[
                {
                  name: 'Analyzed',
                  value: total,
                },
                {
                  name: 'Under',
                  value: under,
                },
              ]}
              cx='50%'
              cy='50%'
              outerRadius='80%'
              fill='#8884d8'
              dataKey='value'
              nameKey='name'
              label
            >
              {COLORS.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CustomPieChart;
