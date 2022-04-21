import React, { useEffect, useState } from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts';
import { useTheme, Card, CardContent, Typography } from '@mui/material';

const PieSlapandeKurser = ({ data, title }) => {
  const theme = useTheme();
  const COLORS = [theme.palette.success.light, theme.palette.error.main];

  return (
    <Card style={{ width: '35%', height: 300 }}>
      <CardContent>
        <Typography variant='h2' fontWeight='medium' align='center'>
          Antal som har VS antal som inte har släpande kurser för {title}
        </Typography>
        <ResponsiveContainer height={200} width='100%'>
          <PieChart>
            <Pie
              data={data}
              cx='50%'
              cy='50%'
              outerRadius='80%'
              fill='#8884d8'
              dataKey='value'
              nameKey='name'
              label
            >
              {data.map((entry, index) => (
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

export default PieSlapandeKurser;
