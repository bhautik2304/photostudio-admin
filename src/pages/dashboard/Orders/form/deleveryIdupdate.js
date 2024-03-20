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

  const [deliveriInstructon, setDeliveriInstructon] = useState({
    parnerlink: data?.delivery_partner_link || "xyz.com",
    deliverycode: data?.delivery_tracking_no || 0
  })

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
                  onChange={(e) => setDeliveriInstructon({ ...deliveriInstructon, deliverycode: e.target.value })}
                  value={deliveriInstructon.deliverycode}
                  sx={{ color: 'red' }}

                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  size="small"
                  label="Delivery Partner Link"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  onChange={(e) => setDeliveriInstructon({ ...deliveriInstructon, parnerlink: e.target.value })}
                  value={deliveriInstructon.parnerlink}
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
