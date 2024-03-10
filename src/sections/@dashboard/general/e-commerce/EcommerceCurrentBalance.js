import PropTypes from 'prop-types';
// @mui
import { Button, Card, Typography, Stack } from '@mui/material';
// utils
import { useNavigate } from 'react-router';
import { fCurrency } from '../../../../utils/formatNumber';
import { PATH_DASHBOARD } from '../../../../routes/paths';

// ----------------------------------------------------------------------

EcommerceCurrentBalance.propTypes = {
  sx: PropTypes.object,
  title: PropTypes.string,
  sentAmount: PropTypes.number,
  currentBalance: PropTypes.number,
};

export default function EcommerceCurrentBalance({
  title,
  sentAmount,
  currentBalance,
  sx,
  ...other
}) {
  const totalAmount = currentBalance - sentAmount;
const navigate = useNavigate()
  return (
    <Card sx={{ p: 3, ...sx }} {...other}>
      <Typography mb={5} variant="subtitle2" gutterBottom>
        {title}
      </Typography>

      <Stack spacing={2}>

        <Stack direction="row" justifyContent="space-between" >
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Flush Mount Orders
          </Typography>
          <Typography variant="body2">{fCurrency(currentBalance)}</Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Photobook Orders
          </Typography>
          <Typography variant="body2">- {fCurrency(sentAmount)}</Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Frame Orders
          </Typography>
          <Typography variant="subtitle1">{fCurrency(totalAmount)}</Typography>
        </Stack>

        <Stack direction="row" spacing={1.5}>
          <Button fullWidth variant="contained" onClick={()=>{
navigate(PATH_DASHBOARD.orders.root)
          }} color="warning">
            Check Orders
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}
