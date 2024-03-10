import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { useSelector } from 'react-redux';
import { PATH_DASHBOARD } from '../../../routes/paths';
// _mock_
import { _invoices } from '../../../_mock/arrays';
// components
import { useSettingsContext } from '../../../components/settings';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// sections
import InvoiceNewEditForm from './form';
import OrderDetaildData from './form/orderDetaildData';

// ----------------------------------------------------------------------

export default function InvoiceEditPage() {

    const [currentInvoice, setCurrentInvoice] = useState({})

    const { themeStretch } = useSettingsContext();

    const { id } = useParams();

    const { orders } = useSelector(state => state.order)


    useEffect(() => {
        setCurrentInvoice(orders.find((invoice) => invoice.id === Number(id)))
    }, [orders, id])

    console.log(currentInvoice);

    return (
        <>
            <Helmet>
                <title> Order :{` ORD-${currentInvoice?.order_no}`}  | Photokrfft.com</title>
            </Helmet>

            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="ORDER"
                    links={[
                        {
                            name: 'Dashboard',
                            href: PATH_DASHBOARD.root,
                        },
                        {
                            name: 'Orders',
                            href: PATH_DASHBOARD.orders.root,
                        },
                        { name: `ORD-${currentInvoice?.order_no}` },
                    ]}
                />

                <InvoiceNewEditForm isEdit currentInvoice={currentInvoice} />
            </Container>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="ORDER : DETAILS"
                    links={[
                        { name: `ORD-${currentInvoice?.order_no}` },
                    ]}
                />

                <OrderDetaildData isEdit currentInvoice={currentInvoice} />
            </Container>
        </>
    );
}
