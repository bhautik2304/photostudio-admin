import PropTypes from 'prop-types';
// @mui
import { Stack, Link, Button, Typography, Card } from '@mui/material';
import { useNavigate } from 'react-router';
// utils
import { fDate } from '../../../../../utils/formatTime';
import { fCurrency } from '../../../../../utils/formatNumber';
// components
import Iconify from '../../../../../components/iconify';
import { PATH_DASHBOARD } from '../../../../../routes/paths';

// ----------------------------------------------------------------------

AccountBillingInvoiceHistory.propTypes = {
  invoices: PropTypes.array,
};

export default function AccountBillingInvoiceHistory({ invoices }) {
  console.log(invoices);
const navigate=useNavigate()

  return (
    <Card sx={{ p: 3 }}>
      <Stack spacing={3} alignItems="flex-end">
        <Typography variant="overline" sx={{ width: 1, color: 'text.secondary' }}>
          Invoice History
        </Typography>

        <Stack spacing={2} sx={{ width: 1 }}>
          {invoices.map((invoice) => (
            <Stack key={invoice.id} direction="row" justifyContent="space-between" sx={{ width: 1 }}>
              <Typography variant="body2" sx={{ minWidth: 120 }}>
                {fDate(invoice.created_at)}
              </Typography>

              <Typography variant="body2">{`${invoice?.countryzone?.currency_sign} ${invoice.order_total}`}</Typography>

              <Button onClick={()=>{
            navigate(PATH_DASHBOARD.orders.detail + invoice.id)
              }} >ORD-{invoice?.order_no}</Button>
            </Stack>
          ))}
        </Stack>

        <Button size="small" color="inherit" endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}>
          All orders
        </Button>
      </Stack>
    </Card>
  );
}
