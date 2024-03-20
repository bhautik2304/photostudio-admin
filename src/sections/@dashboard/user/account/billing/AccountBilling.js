import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import { Box, Grid, Card, Button, Typography, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
//
import AccountBillingAddressBook from './AccountBillingAddressBook';
import AccountBillingPaymentMethod from './AccountBillingPaymentMethod';
import AccountBillingInvoiceHistory from './AccountBillingInvoiceHistory';

// ----------------------------------------------------------------------

AccountBilling.propTypes = {
  cards: PropTypes.array,
  invoices: PropTypes.array,
  addressBook: PropTypes.array,
};

export default function AccountBilling({ cards, addressBook, invoices }) {

  const [data, setData] = useState([])
  const { id } = useParams()
  const { orders } = useSelector(state => state.order)

  useEffect(() => {
    // eslint-disable-next-line eqeqeq
    setData(orders.filter((datas) => Number(datas?.user_id) == id).reverse())
  }, [id, orders])

  console.log(data);
  // console.log();
  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={6}>
        <Stack spacing={3}>
          <AccountBillingPaymentMethod cards={cards} />
        </Stack>
      </Grid>

      <Grid item xs={12} md={6}>
        <AccountBillingInvoiceHistory invoices={data} />
      </Grid>
    </Grid>
  );
}
