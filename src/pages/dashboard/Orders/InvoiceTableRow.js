import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import {
  Link,
  Stack,
  Button,
  Divider,
  Checkbox,
  TableRow,
  MenuItem,
  TableCell,
  IconButton,
  Typography,
  Badge,
} from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
import Iconify from '../../../components/iconify';
import { CustomAvatar } from '../../../components/custom-avatar';
import MenuPopover from '../../../components/menu-popover';
import ConfirmDialog from '../../../components/confirm-dialog';

// ----------------------------------------------------------------------

InvoiceTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
};

export default function InvoiceTableRow({
  row,
  selected,
  onSelectRow,
  onViewRow,
  onEditRow,
  onDeleteRow,
}) {
  const { costomer, order_date, order_no, payment_status, order_status, order_total, is_sample } = row;

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  console.log(row);

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <CustomAvatar name={costomer?.name} />

            <div>
              <Typography variant="subtitle2" noWrap>
                {costomer?.name}
              </Typography>

              <Link
                noWrap
                variant="body2"
                onClick={()=>onEditRow()}
                sx={{ color: 'text.disabled', cursor: 'pointer' }}
              >
                {`INV-${order_no}`}
              </Link>
            </div>
            {is_sample ?
              <Label color="info" >
                Sample
              </Label> : null}
          </Stack>
        </TableCell>

        <TableCell align="left">{fDate(order_date)}</TableCell>


        <TableCell align="center">{`${row?.countryzone?.currency_sign} ${order_total}`}</TableCell>


        <TableCell align="left">
          <Label
            variant="soft"
            color={
              (payment_status === 'paid' && 'success') ||
              (payment_status === 'credit' && 'warning') ||
              (payment_status === 'pending' && 'error') ||
              'default'
            }
          >
            {payment_status}
          </Label>
        </TableCell>

        <TableCell align="left">
          <Label
            variant="soft"
            color={
              (order_status === 'pending' && 'warning') ||
              (order_status === 'processing' && 'info') ||
              (order_status === 'completed' && 'success') ||
              (order_status === 'cancel' && 'error') ||
              'default'
            }
          >
            {order_status}
          </Label>
        </TableCell>

        <TableCell align="right">
          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem
          onClick={() => {
            onViewRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:eye-fill" />
          View
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}
