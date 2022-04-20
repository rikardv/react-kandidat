import React, { useEffect, useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { MenuItem, InputLabel, FormControl } from '@mui/material';
import getCourseStartDatesjs from '../../connections/test/getCourseStartDatesjs';
import Loading from '../layout/Loading';

const DatesList = ({ kurskod, handleSelectDate }) => {
  const [dates, setDates] = useState();
  const [selectedDate, setSelectedDate] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCourseStartDatesjs(kurskod).then((data) => {
      //Create arr and add selected property
      let arr = data.data.map((element) => ({ ...element, disabled: false }));
      setDates(arr);
      setLoading(false);
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

 
    return loading ? ( // Oklart om det är såhär vi vill visa upp den eller om vi helt enkelt ska låta den vara tom innan
      <Loading />
  ) : (
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
