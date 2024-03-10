import PropTypes from 'prop-types';
import { useState, useMemo, useEffect } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Card, Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// mock
import { _invoiceAddressFrom } from '../../../../_mock/arrays';
// components
import FormProvider from '../../../../components/hook-form';
//
import InvoiceNewEditDetails from './InvoiceNewEditDetailsPlaceholder';
import DeleveryIdupdate from './deleveryIdupdate';
import OrderDetaildStatusData from './OrderDetaildStatusData ';

// ----------------------------------------------------------------------

OrderDetaildData.propTypes = {
  isEdit: PropTypes.bool,
  currentInvoice: PropTypes.object,
};

export default function OrderDetaildData({ isEdit, currentInvoice }) {
  const navigate = useNavigate();

  const [loadingSave, setLoadingSave] = useState(false);

  useEffect(() => {


  }, [isEdit, currentInvoice]);

  const handleSaveAsDraft = async (data) => {
    setLoadingSave(true);

  };

  console.log(currentInvoice);

  return (
    <>
    <Card>
      <OrderDetaildStatusData data={currentInvoice} />
      <InvoiceNewEditDetails data={currentInvoice} />
    </Card>
    <Card sx={{ marginTop:5 }} >
      {/* <OrderDetaildStatusData data={currentInvoice} /> */}
        <DeleveryIdupdate data={currentInvoice} />
    </Card>
    </>
  );
}
