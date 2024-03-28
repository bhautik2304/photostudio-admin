import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
// form

// @mui
import { Box, Stack, Button, Divider, Typography, InputAdornment, TextField, Grid } from '@mui/material';
// utils

// components

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

InvoiceNewEditDetails.propTypes = {
  data: PropTypes.object,
};

export default function InvoiceNewEditDetails({ data }) {

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
    setOrderData({
      ...orderData,
      discount: data?.discount,
      discountAmount: (Number(data?.order_total) * Number(data?.discount)) / 100,
      orderValue: data?.order_total
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);


  const paperPrice = (sheetValue, paperValue) => ((sheetValue * paperValue) / 100) + sheetValue;

  const fCurrency = (sign, val) => `${sign} ${val}`

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
        Details:
      </Typography>

      <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
        <Stack alignItems="flex-end" spacing={1.5}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={5}>
                <TextField
                  size="small"
                  label="Porduct Name"
                  value={data?.product?.name}
                  InputLabelProps={{ shrink: true, style: { fontSize: '.875rem' } }}
                  fullWidth
                  sx={{ marginBottom: '1em' }}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  size="small"
                  type="number"
                  label="Quantity"
                  value="1"
                  InputLabelProps={{ shrink: true, style: { fontSize: '.875rem' } }}
                  fullWidth
                  sx={{ marginBottom: '1em' }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  size="small"
                  type="number"
                  label="Price"
                  value="0"
                  InputLabelProps={{ style: { fontSize: '.875rem' } }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">{data?.countryzone?.currency_sign}</InputAdornment>,
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  disabled
                  size="small"
                  label="Total"
                  value="0"
                  InputLabelProps={{ style: { fontSize: '.875rem' } }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">{data?.countryzone?.currency_sign}</InputAdornment>,
                  }}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Stack>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={5}>
                <TextField
                  size="small"
                  label="Paper Sheets & Paper Type"
                  value={`${data?.productsheet?.sheet?.name} + ( ${data?.productpaper?.paper?.name} ${data?.productpaper?.paper?.value}%)`}
                  InputLabelProps={{ shrink: true, style: { fontSize: '.875rem' } }}
                  fullWidth
                  sx={{ marginBottom: '1em' }}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  size="small"
                  type="number"
                  label="Page Quantity"
                  value={data?.page_qty}
                  InputLabelProps={{ shrink: true, style: { fontSize: '.875rem' } }}
                  fullWidth
                  sx={{ marginBottom: '1em' }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  size="small"
                  label="Price"
                  InputLabelProps={{ style: { fontSize: '.875rem' } }}
                  value={`${data?.sheetValue} + ${data?.productpaper?.paper?.value}% ( ${paperPrice(data?.sheetValue, data?.productpaper?.paper?.value)} )`}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">{data?.countryzone?.currency_sign}</InputAdornment>,
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  disabled
                  size="small"
                  label="Total"
                  InputLabelProps={{ style: { fontSize: '.875rem' } }}
                  value={Number(paperPrice(data?.sheetValue, data?.productpaper?.paper?.value)) * Number(data?.page_qty)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">{data?.countryzone?.currency_sign}</InputAdornment>,
                  }}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Stack>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={5}>
                <TextField
                  size="small"
                  label="Cover"
                  value={`${data?.productcover?.cover?.name}`}
                  InputLabelProps={{ shrink: true, style: { fontSize: '.875rem' } }}
                  fullWidth
                  sx={{ marginBottom: '1em' }}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  size="small"
                  type="number"
                  label="Quantity"
                  value={1}
                  InputLabelProps={{ shrink: true, style: { fontSize: '.875rem' } }}
                  fullWidth
                  sx={{ marginBottom: '1em' }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  size="small"
                  type="number"
                  label="Price"
                  InputLabelProps={{ style: { fontSize: '.875rem' } }}
                  value={data?.coverValue}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">{data?.countryzone?.currency_sign}</InputAdornment>,
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  disabled
                  size="small"
                  label="Total"
                  InputLabelProps={{ style: { fontSize: '.875rem' } }}
                  value={data?.coverValue}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">{data?.countryzone?.currency_sign}</InputAdornment>,
                  }}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Stack>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={5}>
                <TextField
                  size="small"
                  label="Box & Sleeve"
                  value={`${data?.productboxsleeve?.boxsleeve?.name}`}
                  InputLabelProps={{ shrink: true, style: { fontSize: '.875rem' } }}
                  fullWidth
                  sx={{ marginBottom: '1em' }}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  size="small"
                  type="number"
                  label="Quantity"
                  value={1}
                  InputLabelProps={{ shrink: true, style: { fontSize: '.875rem' } }}
                  fullWidth
                  sx={{ marginBottom: '1em' }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  size="small"
                  type="number"
                  label="Price"
                  InputLabelProps={{ style: { fontSize: '.875rem' } }}
                  value={data?.boxSleeveValue}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">{data?.countryzone?.currency_sign}</InputAdornment>,
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  disabled
                  size="small"
                  label="Total"
                  InputLabelProps={{ style: { fontSize: '.875rem' } }}
                  value={data?.boxSleeveValue}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">{data?.countryzone?.currency_sign}</InputAdornment>,
                  }}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Stack>
        </Stack>

      </Stack>

      <Divider sx={{ my: 3, borderStyle: 'dashed', borderColor: '#b4b4b4' }} />

      <Stack
        spacing={2}
        direction={{ xs: 'column-reverse', md: 'row' }}
        alignItems={{ xs: 'flex-start', md: 'center' }}
      >

        <Stack
          spacing={2}
          justifyContent="flex-end"
          direction={{ xs: 'column', md: 'row' }}
          sx={{ width: 1 }}
        >
          <TextField
            size="small"
            label="Discount"
            value={orderData.discount}
            type='number'
            InputLabelProps={{ style: { fontSize: '.875rem' } }}
            onChange={(event) => setDiscount(Number(event.target.value))}
            InputProps={{
              startAdornment: <InputAdornment position="start">%</InputAdornment>,
            }}
            sx={{ maxWidth: { md: 200 } }}
          />
        </Stack>
      </Stack>

      <Stack spacing={2} sx={{ mt: 3 }}>
        <Stack direction="row" justifyContent="flex-end">
          <Typography>Subtotal :</Typography>
          <Typography sx={{ textAlign: 'right', width: 120 }}>
            {fCurrency(data?.countryzone?.currency_sign, data?.productValue) || '-'}
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="flex-end">
          <Typography>Shiping Charges :</Typography>
          <Typography sx={{ textAlign: 'right', width: 120 }}>
            {data?.shippingValue ? fCurrency(data?.countryzone?.currency_sign, data?.shippingValue) : '-'}
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="flex-end">
          <Typography>Total Price:</Typography>
          <Typography
            sx={{ textAlign: 'right', width: 120 }}
          >
            {`${fCurrency(data?.countryzone?.currency_sign, data?.order_total)}`}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="flex-end">
          <Typography>Discount :</Typography>
          <Typography
            sx={{ textAlign: 'right', width: 120, }}
          >
            {orderData.discount ? `- ${orderData.discount}%` : '-'}
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="flex-end">
          <Typography variant="h6">Final Price :</Typography>
          <Typography variant="h6" sx={{ textAlign: 'right', width: 120 }}>
            {fCurrency(data?.countryzone?.currency_sign, orderData?.orderValue) || '-'}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
