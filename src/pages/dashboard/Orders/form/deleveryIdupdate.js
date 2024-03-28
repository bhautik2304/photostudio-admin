import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
// form
import { Icon } from '@iconify/react';
// @mui
import { toast } from 'react-toastify';
import {
  Box, Stack, Divider, Typography, TextField, Grid,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// utils
import Iconify from '../../../../components/iconify';
import adminAxios from '../../../../Api/adminAxios';
import { apiRoutes, statusCode } from '../../../../constants';
// components

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

DeleveryIdupdate.propTypes = {
  data: PropTypes.object,
};

export default function DeleveryIdupdate({ data }) {

  const [deliveriInstructon, setDeliveriInstructon] = useState({
    parnerlink: data?.delivery_partner_link || "xyz.com",
    deliverycode: data?.delivery_tracking_no || 0
  })

  const [state, setState] = useState(false)

  const sentDetaild = () => {
    const toastId = toast.loading('Please wait...');
    adminAxios.post(`${apiRoutes.orderReq}/delivery/${data.id}`, deliveriInstructon).then((response) => {
      if (response.data.code === statusCode.success) {
        toast.update(toastId, { render: response.data.msg, type: 'success', isLoading: false });
        setState(false)
        setTimeout(() => {
          toast.dismiss(toastId);
        }, 5000);
      }
    }).catch(errors => {
      console.error('Error in creating user:', errors);
      toast.update(toastId, { render: "Somethig Went Wrong", type: 'error', isLoading: false });
      setState(false)
      setTimeout(() => {
        toast.dismiss(toastId);
      }, 5000);
    });
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h6" sx={{ color: 'text.', mb: 3 }}>
        Delivery Details:
      </Typography>

      <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
        <Stack alignItems="flex-end" spacing={1.5}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  size="small"
                  label="Delivery / Tracking Number"
                  InputLabelProps={{ shrink: true, style: { fontSize: '.875rem' } }}
                  fullWidth
                  onChange={(e) => setDeliveriInstructon({ ...deliveriInstructon, deliverycode: e.target.value })}
                  value={deliveriInstructon.deliverycode}
                  sx={{ color: 'red' }}

                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  size="small"
                  label="Delivery Partner Link"
                  InputLabelProps={{ shrink: true, style: { fontSize: '.875rem' } }}
                  fullWidth
                  onChange={(e) => setDeliveriInstructon({ ...deliveriInstructon, parnerlink: e.target.value })}
                  value={deliveriInstructon.parnerlink}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <LoadingButton variant="contained" onClick={sentDetaild} loading={state} >Send Instructions to client</LoadingButton>
              </Grid>
            </Grid>
          </Stack>
        </Stack>
      </Stack>
      <Divider sx={{ my: 3, borderStyle: 'dashed' }} />
    </Box>
  );
}
