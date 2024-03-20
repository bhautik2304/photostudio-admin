import PropTypes from 'prop-types';
import { useState } from 'react';
// form
import { useFormContext } from 'react-hook-form';
// @mui
import { Stack, Divider, Typography, Button } from '@mui/material';
// hooks
import useResponsive from '../../../../hooks/useResponsive';
// _mock
import { _invoiceAddressFrom, _invoiceAddressTo } from '../../../../_mock/arrays';
// components
import Iconify from '../../../../components/iconify';
//
import InvoiceAddressListDialog from './InvoiceAddressListDialog';
import { capitalizeFirstLetter } from '../../../../utils/string';

// ----------------------------------------------------------------------

InvoiceNewEditAddress.propTypes = {
  data: PropTypes.object,
};

export default function InvoiceNewEditAddress({ data }) {

  const upMd = useResponsive('up', 'md');

  return (
    <Stack
      spacing={{ xs: 2, md: 5 }}
      direction={{ xs: 'column', md: 'row' }}
      divider={
        <Divider
          flexItem
          orientation={upMd ? 'vertical' : 'horizontal'}
          sx={{ borderStyle: 'dashed' }}
        />
      }
      sx={{ p: 3 }}
    >
      <Stack sx={{ width: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography variant="h6" sx={{ color: 'text.disabled' }}>
            From:
          </Typography>
        </Stack>

        <AddressInfo
          name="Photokraffr.com"
          address=""
          phone=""
        />
      </Stack>

      <Stack sx={{ width: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography variant="h6" sx={{ color: 'text.disabled' }}>
            To:
          </Typography>
        </Stack>

        <AddressInfo name={capitalizeFirstLetter(data?.costomer?.name)} compunysname={capitalizeFirstLetter(data?.costomer?.compunys_name)} address={data?.delivery_address !== "0" ? data?.delivery_address : data?.costomer?.address} phone={data?.costomer?.phone_no} />

      </Stack>
    </Stack>
  );
}

// ----------------------------------------------------------------------

AddressInfo.propTypes = {
  name: PropTypes.string,
  phone: PropTypes.string,
  address: PropTypes.string,
  compunysname: PropTypes.string,
};

function AddressInfo({ name, address, phone, compunysname }) {
  return (
    <>
      <Typography variant="subtitle2">{name}</Typography>
      <Typography variant="subtitle2">{compunysname}</Typography>
      <Typography variant="body2" sx={{ mt: 1, mb: 0.5 }}>
        {address}
      </Typography>
      <Typography variant="body2">{phone}</Typography>
    </>
  );
}
