import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import axios from 'axios';

// @mui
import { Card, Stack, Paper, Button, Typography, IconButton, TextField } from '@mui/material';
// components
import Image from '../../../../../components/image';
import Iconify from '../../../../../components/iconify';
// section
import { PaymentNewCardDialog } from '../../../../payment';
import { apiRoutes } from '../../../../../constants';

// ----------------------------------------------------------------------

AccountBillingPaymentMethod.propTypes = {
  cards: PropTypes.array,
};

export default function AccountBillingPaymentMethod({ cards }) {
  const [discount, setDiscount] = useState(0);


  const { customer } = useSelector(state => state.customer)
  const { id } = useParams()

  const find = customer.filter(item => item.id === Number(id))[0]

  useEffect(() => {
    setDiscount(find?.discount);
  }, [find])


  const save = () => {
    axios.post(`${apiRoutes.costomer}discount-update/${id}`, { discounts: discount }).then(res => {
      console.log(res.data);
    })
  }

  return (
    <Card sx={{ p: 3 }}>
      <Stack direction="row" alignItems="center" sx={{ mb: 3 }}>
        <Typography
          variant="overline"
          sx={{
            flexGrow: 1,
            color: 'text.secondary',
          }}
        >
          Discount
        </Typography>
      </Stack>
      <Stack
        spacing={2}
        direction={{
          xs: 'column',
          md: 'row',
        }}
      >
        <Paper
          variant="outlined"
          sx={{
            p: 1,
            width: 1,
            position: 'relative',
            border: 0
          }}
        >
          {/* <Stack direction="row" alignItems="center" spacing={2} > */}
          <Stack direction="row" alignItems="center" spacing={2} >
            <TextField value={discount} onChange={(e) => setDiscount(e.target.value)} label="Discount" sx={{ width: '70%' }} />
            <Button onClick={() => save()}  variant="contained" sx={{ width: '30%' }}>Save Changes</Button>
          </Stack>
        </Paper>
      </Stack>
    </Card>
  );
}
