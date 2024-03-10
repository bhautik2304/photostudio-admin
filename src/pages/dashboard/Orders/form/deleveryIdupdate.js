import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
// form
import { Icon } from '@iconify/react';
// @mui
import {
  Box, Stack, Button, Divider, Typography, Table, TextField, Grid, Card, TableBody, TableRow, TableHead, TableCell
} from '@mui/material';
// utils
import Iconify from '../../../../components/iconify';
// components

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

DeleveryIdupdate.propTypes = {
  data: PropTypes.object,
};

export default function DeleveryIdupdate({ data }) {

  const [orderData, setOrderData] = useState({
    discount: 0,
    discountAmount: 0,
    orderValue: 0,
  });

  const setDiscount = (value) => {
    setOrderData({
      ...orderData,
      discount: value,
      discountAmount: (Number(data?.order_total) * value) / 100,
      orderValue: (Number(data?.order_total) - ((Number(data?.order_total) * value) / 100)),
    });
  }

 

  useEffect(() => {
    setOrderData({ ...orderData, orderValue: data?.order_total });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);


  const paperPrice = (sheetValue, paperValue) => ((sheetValue * paperValue) / 100) + sheetValue;

  const fCurrency = (sign, val) => `${sign} ${val}`

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h6" sx={{ color: 'text.', mb: 3 }}>
        Delivery Details:
      </Typography>

      <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
        <Stack alignItems="flex-end" spacing={1.5}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  size="small"
                  label="Delivery / Tracking Number"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  sx={{ color: 'red' }}

                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  size="small"
                  label="Delivery Partner Link"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={10}>
                <Button variant="contained">Send Instructions to client</Button>
              </Grid>
            </Grid>
          </Stack>
        </Stack>
      </Stack>
      <Divider sx={{ my: 3, borderStyle: 'dashed' }} />
    </Box>
  );
}
