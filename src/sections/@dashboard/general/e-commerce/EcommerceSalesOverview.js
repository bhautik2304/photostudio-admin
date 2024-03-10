/* eslint-disable eqeqeq */
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
// @mui
import { Card, CardHeader, Typography, Stack, LinearProgress } from '@mui/material';
// utils
import { fPercent, fCurrency } from '../../../../utils/formatNumber';

// ----------------------------------------------------------------------

EcommerceSalesOverview.propTypes = {
  data: PropTypes.array,
  title: PropTypes.string,
  subheader: PropTypes.string,
};

export default function EcommerceSalesOverview({ title, subheader, data, ...other }) {

  const {orders} = useSelector(state=>state.order)

  const Total = orders.length ;
  const Pending = orders.filter(datas=>datas.order_status == "pending").length ;
  const Processing = orders.filter(datas=>datas.order_status == "processing").length ;
  const Cancel = orders.filter(datas=>datas.order_status == "cancel").length ;

  console.log(orders);

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      <Stack spacing={4} sx={{ p: 3 }}>
        <ProgressItem progress={{
          label: "Total Order", value: 100, amount: Total
        }} />
        <ProgressItem  progress={{
          label: "Pending Order", value: 100, amount: Pending
        }} />
        <ProgressItem  progress={{
          label: "Processing Order", value: 100, amount: Processing
        }} />
        <ProgressItem  progress={{
          label: "Cancel Order", value: 100, amount: Cancel
        }} />
      </Stack>
    </Card>
  );
}

// ----------------------------------------------------------------------

ProgressItem.propTypes = {
  progress: PropTypes.shape({
    amount: PropTypes.number,
    label: PropTypes.string,
    value: PropTypes.number,
  }),
};

function ProgressItem({ progress }) {
  return (
    <Stack spacing={1}>
      <Stack direction="row" alignItems="center">
        <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
          {progress.label}
        </Typography>
        <Typography variant="subtitle2">{progress.amount}</Typography>
      </Stack>

      <LinearProgress
        variant="determinate"
        value={progress.value}
        color={
          (progress.label === 'Total Order' && 'info') ||
          (progress.label === 'Pending Order' && 'warning') ||
          (progress.label === 'Cancel Order' && 'error') ||
          'primary'
        }
      />
    </Stack>
  );
}
