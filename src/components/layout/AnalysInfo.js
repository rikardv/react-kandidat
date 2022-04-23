import { Avatar, Stack, Typography, useTheme, Grid } from '@mui/material';
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
    <Grid
      item
      xs={12}
      sm={12}
      md={12}
      lg={12}
      justifyContent='center'
      alignItems='center'
    >
      <Stack
        direction='row'
        spacing={10}
        justifyContent='center'
        alignItems='center'
        padding={2}
      >
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
    </Grid>
  );
};

export default AnalysInfo;
