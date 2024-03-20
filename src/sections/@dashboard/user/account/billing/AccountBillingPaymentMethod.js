import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { api } from '../../../../../Api/api';
import { fetchCustomer } from '../../../../../redux/slices/customer';

// ----------------------------------------------------------------------

AccountBillingPaymentMethod.propTypes = {
  cards: PropTypes.array,
};

export default function AccountBillingPaymentMethod({ cards }) {
  const [discount, setDiscount] = useState(0);
  const [users, setUsers] = useState();


  const dispatch= useDispatch()
  const { customer } = useSelector(state => state.customer)
  const { id } = useParams()

  const find = customer.filter(item => item.id === Number(id))[0]

  useEffect(() => {
    setDiscount(find?.discount);
    setUsers(find);
  }, [find])


  const save = () => {
    axios.post(`${apiRoutes.costomer}discount-update/${id}`, { discounts: discount }).then(res => {
      dispatch(fetchCustomer())
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
            <Button onClick={() => save()} variant="contained" sx={{ width: '30%' }}>Save Changes</Button>
          </Stack>
        </Paper>
      </Stack>
      <Stack direction="row" alignItems="center" sx={{ my: 3 }}>
        <Typography
          variant="overline"
          sx={{
            flexGrow: 1,
            color: 'text.secondary',
          }}
        >
          Sample Orders Permission
        </Typography>
      </Stack>
      {
        users && users?.sample_orders.map((e, key) => (
          <Stack key={key} display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' >
            <Typography
              variant="overline"
              sx={{
                flexGrow: 1,
                color: 'text.secondary',
              }}
            >
              {key + 1}
            </Typography>
            <Typography
              variant="overline"
              sx={{
                flexGrow: 1,
                color: 'text.secondary',
              }}
            >
              {e?.product?.name}
            </Typography>
            <Typography
              variant="overline"
              sx={{
                flexGrow: 1,
                color: 'text.secondary',
              }}
            >
              ORD-{e?.orders?.order_no}
            </Typography>
            <Typography
              variant="overline"
              sx={{
                flexGrow: 1,
                color: 'text.secondary',
              }}
            >
              <Button onClick={()=>{
                api.ordersApi.sampleorderpermission(e.id,()=>dispatch(fetchCustomer()))
              }} >Activate</Button>
            </Typography>
          </Stack>
        ))
      }
    </Card>
  );
}
