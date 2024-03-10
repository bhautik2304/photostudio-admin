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
    setOrderData({ ...orderData, orderValue: data?.order_total });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);


  const paperPrice = (sheetValue, paperValue) => ((sheetValue * paperValue) / 100) + sheetValue;

  const fCurrency = (sign, val) => `${sign} ${val}`

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h6" sx={{ color: 'text.', mb: 3 }}>
        Details:
      </Typography>

      <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
        <Stack alignItems="flex-end" spacing={1.5}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  size="small"
                  label="Porduct Name"
                  value={data?.product?.name}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  sx={{ color: 'red' }}

                />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  size="small"
                  label="Orientation"
                  value={data?.productorientation?.orientation?.name}
                  InputLabelProps={{ shrink: true }}
                  fullWidth

                />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  size="small"
                  label="Size"
                  value={data?.productsize?.size?.name}
                  InputLabelProps={{ shrink: true }}
                  fullWidth

                />
              </Grid>
            </Grid>
          </Stack>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  size="small"
                  label="Paper Sheet"
                  value={data?.productsheet?.sheet?.name}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  sx={{ color: 'red' }}

                />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  size="small"
                  label="Paper Type"
                  value={data?.productpaper?.paper?.name}
                  InputLabelProps={{ shrink: true }}
                  fullWidth

                />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  size="small"
                  label="Print Pages Quantity"
                  value={data?.page_qty}
                  InputLabelProps={{ shrink: true }}
                  fullWidth

                />
              </Grid>
            </Grid>
          </Stack>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  size="small"
                  label="Album Cover"
                  value={data?.productcover?.cover?.name}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  sx={{ color: 'red' }}

                />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  size="small"
                  label=" Leather option"
                  value={data?.coversupgrade?.name}
                  InputLabelProps={{ shrink: true }}
                  fullWidth

                />
              </Grid>
              <Grid item xs={12} md={2}>
                {
                  data?.coversupgradecolor?.img && <img src={data?.coversupgradecolor?.img} alt="" width="100%" height={35} />
                  || <TextField
                    size="small"
                    label="Leather Color"
                    type='color'
                    value={data?.coversupgradecolor?.colorcode}
                    InputLabelProps={{ shrink: true }}
                    fullWidth

                  />
                }
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  size="small"
                  label="Cover Type"
                  value={data?.productcover?.cover?.type}
                  InputLabelProps={{ shrink: true }}
                  fullWidth

                />
              </Grid>
              {
                data?.productcover?.cover?.type === 'img' &&
                <Grid item xs={12} md={2}>
                  <Button variant="outlined" fullWidth startIcon={<Icon icon="mdi:download" />}>
                    Download Photo
                  </Button>
                </Grid>
              }
            </Grid>
          </Stack>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  size="small"
                  label="Box & Sleeve"
                  value={data?.productboxsleeve?.boxsleeve?.name}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  sx={{ color: 'red' }}

                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Button variant="outlined" fullWidth color='error' startIcon={<Icon icon="mdi:download" />}>
                  Download Photo Stack
                </Button>
              </Grid>
            </Grid>
          </Stack>
        </Stack>

      </Stack>

      <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Table style={{ width: '100%' }} >
            {/* <TableBody style={{ width: '100%' }}>
            </TableBody> */}
            <TableHead style={{ width: '100%' }} >
              <TableRow style={{ width: '100%' }} >
                <TableCell>Event Type</TableCell>
                <TableCell align="right">Event Name</TableCell>
                <TableCell align="right">Event Date</TableCell>
                <TableCell align="right">Imprinting</TableCell>
              </TableRow>
            </TableHead>
            <TableRow style={{ width: '100%' }} >
              <TableCell>{data?.order_detaild?.event_type}</TableCell>
              <TableCell align="right">{data?.order_detaild?.event_name}</TableCell>
              <TableCell align="right">{data?.order_detaild?.event_date}</TableCell>
              <TableCell align="right">{data?.order_detaild?.Imprinting}</TableCell>
            </TableRow>
          </Table>
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField name="description" label="Customize Message" multiline rows={3} cols="30" fullWidth value={data?.order_detaild?.customizeMessage} readOnly />
        </Grid>
      </Grid>
    </Box>
  );
}
