import { Avatar, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';

const AnalysInfo = ({
  firstVal,
  firstTitle,
  secondVal,
  secondTitle,
  thirdVal,
  thirdTitle,
}) => {
  const theme = useTheme();
  return (
    <Stack direction='row' spacing={10}>
      {firstVal && (
        <Stack direction='column' spacing={1}>
          <Typography textAlign={'center'}>{firstTitle}</Typography>
          <Avatar
            style={{
              backgroundColor: theme.palette.primary.main,
              alignSelf: 'center',
            }}
            sx={{ width: 56, height: 56 }}
          >
            {firstVal}
          </Avatar>
        </Stack>
      )}

      {secondVal && (
        <Stack direction='column' spacing={1}>
          <Typography textAlign={'center'}>{secondTitle}</Typography>
          <Avatar
            style={{
              backgroundColor: theme.palette.primary.main,
              alignSelf: 'center',
            }}
            sx={{ width: 56, height: 56 }}
          >
            {secondVal}
          </Avatar>
        </Stack>
      )}

      {thirdVal && (
        <Stack direction='column' spacing={1}>
          <Typography textAlign={'center'}>{thirdTitle}</Typography>
          <Avatar
            style={{
              backgroundColor: theme.palette.primary.main,
              alignSelf: 'center',
            }}
            sx={{ width: 56, height: 56 }}
          >
            {thirdVal}
          </Avatar>
        </Stack>
      )}
    </Stack>
  );
};

export default AnalysInfo;
