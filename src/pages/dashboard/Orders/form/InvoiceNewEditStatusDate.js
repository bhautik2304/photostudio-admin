import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { DatePicker } from '@mui/x-date-pickers';
import { Stack, TextField, MenuItem, Select, Grid, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
// components
import { RHFSelect, RHFTextField } from '../../../../components/hook-form';
import { apiRoutes } from '../../../../constants';
import { fetchOrder } from '../../../../redux/slices/order';
import { capitalizeFirstLetter } from '../../../../utils/string';

// ----------------------------------------------------------------------

const PAYMET_STATUS_OPTIONS = ['pending', 'paid', 'credit'];
const ORDER_STATUS_OPTIONS = ['pending', 'processing', 'completed', 'cancel'];

// ----------------------------------------------------------------------

InvoiceNewEditStatusDate.propTypes = {
  data: PropTypes.object,
};

export default function InvoiceNewEditStatusDate({ data }) {

  const [datas, setDatas] = useState({
    paymentStatus: 'pending',
    orderStatus: 'pending',
  })
  // "SQLSTATE[23000]: Integrity constraint violation: 1048 Column 'order_status' cannot be null (SQL: update `orders` set `order_status` = ?, `orders`.`updated_at` = 2024-01-08 19:53:53 where `id` = 1)"

  useEffect(() => {
    setDatas({
      paymentStatus: data?.payment_status,
      orderStatus: data?.order_status,
    })
  }, [data])

  const dispach = useDispatch()

  const orderStatus = (value) => {
    axios.post(`${apiRoutes.orderReq}status/${data.id}`, { status: value }).then(res => dispach(fetchOrder())).catch(err => console.log(err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }
  const paymentStatus = (value) => {
    axios.post(`${apiRoutes.orderReq}status/${data.id}/payment`, { status: value }).then(res => dispach(fetchOrder())).catch(err => console.log(err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }
  return (
    <Stack
      spacing={2}
      direction={{ xs: 'column', sm: 'row' }}
      sx={{ p: 3, bgcolor: 'background.neutral' }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Order Number"
            disabled
            value={`ORD-${data?.order_no}`}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth >
            <InputLabel id="payment-select-standard-label">Payment Status</InputLabel>
            <Select fullWidth
              label="Payment Status"
              labelId="payment-select-standard-label"
              value={datas.paymentStatus} onChange={(e) => paymentStatus(e.target.value)} InputLabelProps={{ shrink: true }}>
              {PAYMET_STATUS_OPTIONS.map((option) => (
                <MenuItem key={option} value={option}>
                  {capitalizeFirstLetter(option)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth >
            <InputLabel id="payment-select-standard-label">Order Status</InputLabel>
            <Select fullWidth label="Order Status" value={datas.orderStatus} onChange={(e) => orderStatus(e.target.value)}>
              {ORDER_STATUS_OPTIONS.map((option) => (
                <MenuItem key={option} value={option}>
                  {capitalizeFirstLetter(option)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField value={data?.order_date} fullWidth />
        </Grid>
      </Grid>
    </Stack>
  );
}
