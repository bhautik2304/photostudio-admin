/* eslint-disable eqeqeq */
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Button } from '@mui/material';
import { useSelector } from 'react-redux';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// _mock_
import {
  _ecommerceNewProducts,
  _ecommerceSalesOverview,
  _ecommerceBestSalesman,
  _barGraphUserOverview,
  _ecommerceLatestProducts,
} from '../../_mock/arrays';
// components
import { useSettingsContext } from '../../components/settings';
// sections
import {
  EcommerceNewProducts,
  EcommerceYearlySales,
  EcommerceBestSalesman,
  EcommerceSaleByGender,
  EcommerceWidgetSummary,
  EcommerceSalesOverview,
  CustomerDemoGraphics,
  EcommerceCurrentBalance,
} from '../../sections/@dashboard/general/e-commerce';
import { AppWelcome } from '../../sections/@dashboard/general/app';
// assets
import { MotivationIllustration } from '../../assets/illustrations';
import { PATH_DASHBOARD } from '../../routes/paths';

// ----------------------------------------------------------------------

export default function GeneralEcommercePage() {
  const { user } = useAuthContext();

  const theme = useTheme();
  const navigate = useNavigate()
  const { themeStretch } = useSettingsContext();

  const data = useSelector(state => state)
  const orderstotal = data?.order.orders.length || 0
  return (
    <>
      <Helmet>
        <title> Dashbord | Photokrafft.com</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <AppWelcome
              title={`Welcome Photokrafft.com ! \n ${user?.name}`}
              description={`You have total ${orderstotal} orders , also please check new pending user request.`}
              img={
                <MotivationIllustration
                  sx={{
                    p: 3,
                    width: 360,
                    margin: { xs: 'auto', md: 'inherit' },
                  }}
                />
              }
              action={<Button variant="contained" onClick={() => {
                navigate(PATH_DASHBOARD.orders.root)
              }} >Check Orders</Button>}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <EcommerceWidgetSummary
              title="Total Product"
              total={1}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <EcommerceWidgetSummary
              title="Total Orders"
              total={data?.order?.orders?.length}
            />
          </Grid>


          <Grid item xs={12} md={3}>
            <EcommerceWidgetSummary
              title="Total Approved Customers"
              total={data?.customer?.customer.filter(datas => datas.approved === 1).length}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <EcommerceWidgetSummary
              title="New Customer Request"
              total={data?.customer?.customer.filter(datas => datas.approved === 0).length}
            />
          </Grid>


          <Grid item xs={6} md={6} lg={6}>
            <EcommerceSalesOverview title="Order Overview" data={_ecommerceSalesOverview} />
          </Grid>

          <Grid item xs={6} md={6} lg={6}>
            <div>
              <CustomerDemoGraphics title="Graph" />
            </div>
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <EcommerceBestSalesman
              title="Customers Request"
              tableData={data?.user?.users.filter((customer) => customer.approved === 0)}
              tableLabels={[
                { id: 'Name', label: 'Name / Email' },
                { id: 'Contact', label: 'Contact No' },
                { id: 'Country', label: 'Country' },
                { id: 'Companys', label: 'Company / Studio Name' },
                { id: 'Action', label: 'Action', },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
