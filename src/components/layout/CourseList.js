import React from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { MenuItem, InputLabel, FormControl } from '@mui/material';

const CourseList = ({ kurskod, selectedCourse, setSelectedCourse }) => {
  const handleSelect = (e) => {
    setSelectedCourse(e.target.value);
  };

  return (
    <FormControl style={{ minWidth: 150 }}>
      <InputLabel id='demo-simple-select-label'>Välj kurs</InputLabel>
      <Select label='Kurskod' value={selectedCourse} onChange={handleSelect}>
        {kurskod &&
          kurskod.map((res, indx) => <MenuItem key={indx} value={res}>{res}</MenuItem>)}
      </Select>
    </FormControl>
  );
};

export default CourseList;
