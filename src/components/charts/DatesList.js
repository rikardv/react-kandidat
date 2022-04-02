import React, { useEffect, useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { MenuItem, InputLabel, FormControl } from '@mui/material';
import getCourseStartDatesjs from '../../connections/test/getCourseStartDatesjs';

const DatesList = ({ kurskod, handleSelectDate }) => {
  const [dates, setDates] = useState();
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    getCourseStartDatesjs(kurskod).then((dates) => {
      setDates(dates.data);
    });
  }, []);

  const handleSelect = (e) => {
    setSelectedDate(e.target.value);
    handleSelectDate(e.target.value);
  };

  return (
    <FormControl style={{ minWidth: 150 }}>
      <InputLabel id="demo-simple-select-label">Välj kursstart</InputLabel>
      <Select label="Kursstart" value={selectedDate} onChange={handleSelect}>
        {dates &&
          dates.map((res) => (
            <MenuItem value={res.start_datum}>{res.start_datum}</MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default DatesList;
