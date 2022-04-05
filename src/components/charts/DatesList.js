import React, { useEffect, useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { MenuItem, InputLabel, FormControl } from '@mui/material';
import getCourseStartDatesjs from '../../connections/test/getCourseStartDatesjs';

const DatesList = ({ kurskod, handleSelectDate }) => {
  const [dates, setDates] = useState();
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    getCourseStartDatesjs(kurskod).then((data) => {
      //Create arr and add selected property
      let arr = data.data.map((element) => ({ ...element, disabled: false }));
      setDates(arr);
    });
  }, []);

  const handleSelect = (e) => {
    console.log(e.target);
    setSelectedDate(e.target.value);
    handleSelectDate(e.target.value);
  };

  const handleDisabled = (indx) => {
    let newArr = [...dates];
    let item = { ...newArr[indx] };
    item.disabled = !item.disabled;
    newArr[indx] = item;
    setDates(newArr);
  };

  return (
    <FormControl style={{ minWidth: 150 }}>
      <InputLabel id='demo-simple-select-label'>Välj kursstart</InputLabel>
      <Select label='Kursstart' value={selectedDate} onChange={handleSelect}>
        {dates &&
          dates.map((res, indx) => (
            <MenuItem
              value={res.start_datum}
              disabled={res.disabled}
              onClick={() => handleDisabled(indx)}
            >
              {res.start_datum}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default DatesList;
