import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
import { useSelector } from 'react-redux';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// _mock_
// import { _invoices } from '../../_mock/arrays';
// components
import { useSettingsContext } from '../../../components/settings';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// sections
import InvoiceDetails from './details';

// ----------------------------------------------------------------------

export default function InvoiceDetailsPage() {
    const { themeStretch } = useSettingsContext();

    const [orderData, setOrderData] = useState({})

    const { id } = useParams();

    const { orders } = useSelector(state => state.order)

    useEffect(() => {
        const currentInvoice = orders.find((invoice) => invoice.id === Number(id));
        setOrderData(currentInvoice)
    }, [id, orders])

    // const currentInvoice = _invoices.find((invoice) => invoice.id === id);

    console.log(orderData);

    return (
        <>
            <Helmet>
                <title> Invoice: View | Minimal UI</title>
            </Helmet>

            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Invoice Details"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        {
                            name: 'Orders',
                            href: PATH_DASHBOARD.orders.root,
                        },
                        { name: `ORD-${orderData?.order_no}` },
                    ]}
                />

                <InvoiceDetails invoice={orderData} />
            </Container>
        </>
    );
}
