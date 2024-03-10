import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
// @mui
import { Container, Tab, Tabs, Box } from '@mui/material';
import { useParams } from 'react-router';
// routes
import { useSelector } from 'react-redux';
import { PATH_DASHBOARD } from '../../../routes/paths';
// _mock_
import { _userPayment, _userAddressBook, _userInvoices, _userAbout } from '../../../_mock/arrays';
// components
import Iconify from '../../../components/iconify';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../components/settings';
// sections
import {
    AccountGeneral,
    AccountBilling,
} from '../../../sections/@dashboard/user/account';

// ----------------------------------------------------------------------

export default function UserAccountPage() {

    
    const { themeStretch } = useSettingsContext();
    
   
    const [currentTab, setCurrentTab] = useState('general');

    const TABS = [
        {
            value: 'general',
            label: 'General',
            icon: <Iconify icon="ic:round-account-box" />,
            component: <AccountGeneral />,
        },
        {
            value: 'billing',
            label: 'Billing',
            icon: <Iconify icon="ic:round-receipt" />,
            component: (
                <AccountBilling
                    cards={_userPayment}
                    addressBook={_userAddressBook}
                    invoices={_userInvoices}
                />
            ),
        },
    ];

    // console.log(data);

    return (
        <>
            <Helmet>
                <title> Customer Profile | Photokraft.com</title>
            </Helmet>

            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Account"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Customer List', href: PATH_DASHBOARD.customer.root },
                        { name: 'Customer Profile' },
                    ]}
                />

                <Tabs value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)}>
                    {TABS.map((tab) => (
                        <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
                    ))}
                </Tabs>

                {TABS.map(
                    (tab) =>
                        tab.value === currentTab && (
                            <Box key={tab.value} sx={{ mt: 5 }}>
                                {tab.component}
                            </Box>
                        )
                )}
            </Container>
        </>
    );
}
