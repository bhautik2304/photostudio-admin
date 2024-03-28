/* eslint-disable eqeqeq */
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Button, ListItemIcon } from '@mui/material';
import { useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteIcon from '@mui/icons-material/Delete';
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
// import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
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

          <Grid item xs={12} md={3} sx={{ position: 'relative', overflow: 'hidden' }}>
            <EcommerceWidgetSummary
              title="Total Product"
              total={1}
              sx={{
                background: "#007fff7a",
                color: "#fff"
              }}
            />
            <ShoppingBagIcon
              sx={{
                position: 'absolute',
                right: "-0.25em",
                color: "#ffffff70",
                fontSize: "12em",
                bottom: "-0.4em",
              }}
            />
          </Grid>
          <Grid item xs={12} md={3} sx={{ position: 'relative', overflow: 'hidden' }}>
            <EcommerceWidgetSummary
              title="Total Orders"
              total={data?.order?.orders?.length}
              sx={{
                background: "#ff00007a",
                color: "#fff"
              }}
            />
            <ShoppingCartIcon
              sx={{
                position: 'absolute',
                right: "-0.15em",
                color: "#ffffff70",
                fontSize: "8em",
                bottom: "-0.25em",
              }}
            />
          </Grid>
          <Grid item xs={12} md={3} sx={{ position: 'relative', overflow: 'hidden' }}>
            <EcommerceWidgetSummary
              title="Total Approved Customers"
              total={data?.customer?.customer.filter(datas => datas.approved === 1).length}
              sx={{
                background: "#9b00ff4f",
                color: "#fff"
              }}
            />
            <VerifiedUserIcon
              sx={{
                position: 'absolute',
                right: "-0.15em",
                color: "#ffffff70",
                fontSize: "8em",
                bottom: "-0.25em",
              }}
            />
          </Grid>
          <Grid item xs={12} md={3} sx={{ position: 'relative', overflow: 'hidden' }}>
            <EcommerceWidgetSummary
              title="New Customer Request"
              total={data?.customer?.customer.filter(datas => datas.approved === 0).length}
              sx={{
                background: "#ff360066",
                color: "#fff"
              }}
            />
            <PersonAddIcon
              sx={{
                position: 'absolute',
                right: "-0.15em",
                color: "#ffffff70",
                fontSize: "8em",
                bottom: "-0.2em",
              }}
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
              tableData={data?.customer?.customer?.filter((customer) => customer.approved === 0)}
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
