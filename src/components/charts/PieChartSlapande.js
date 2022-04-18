import React, { useEffect, useState } from 'react';
import getSlapande from '../../connections/getSlapande';
import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts';
import Loading from '../layout/Loading';
import { useTheme, Card, CardContent, Typography } from '@mui/material';

const PieChartSlapande = ({ startDatum, programKod, kursKoder }) => {
  const [slapande, setSlapande] = useState();
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  const COLORS = [theme.palette.success.light, theme.palette.error.main];

  useEffect(() => {
    //Hämtar antalet släpande kurser för personer
    getSlapande(programKod, startDatum).then((res) => {
      setSlapande(res.data2);
      //Hämtning klar - avbryt laddning
      setLoading(false);
    });
  }, [programKod, startDatum]);

  return loading ? (
    <Loading></Loading>
  ) : (
    <Card style={{ width: '90%', height: 550 }}>
      <CardContent>
        <Typography variant='h1' fontWeight='medium' align='center'>
          Antal som har VS antal som inte har släpande kurser.
        </Typography>
        <ResponsiveContainer height={500} width='100%'>
          <PieChart height={300} width={300}>
            <Pie
              data={slapande}
              cx='50%'
              cy='50%'
              outerRadius={200}
              fill='#8884d8'
              dataKey='value'
              nameKey='name'
              label
            >
              {slapande.map((entry, index) => (
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

export default PieChartSlapande;
