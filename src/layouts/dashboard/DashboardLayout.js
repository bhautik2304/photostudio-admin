/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// @mui
import { Box } from '@mui/material';
// // channels
// import Echo from 'laravel-echo';
// import Pusher from 'pusher-js';

// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import { useSettingsContext } from '../../components/settings';
//
import Main from './Main';
import Header from './header';
import NavMini from './nav/NavMini';
import NavVertical from './nav/NavVertical';
import NavHorizontal from './nav/NavHorizontal';
import { Alert } from '../../components/alert/index';
import { fetchCustomer } from '../../redux/slices/customer';
import { fetchOrder } from '../../redux/slices/order';

import { fetchOrientation, fetchSize, fetchcountryzone,fetchboxsleeveupgradesReq, fetchsheet, fetchcovers, fetchcoversupgrades, fetchcolors, fetchboxsleeve, fetchproduct, fetchpaper } from '../../redux/thunk';
import { api } from '../../Api/api';
import { fetchAdminUsers } from '../../redux/slices/user';
// ----------------------------------------------------------------------

// const echo = new Echo({
//   broadcaster: 'pusher',
//   key: '81314e8a37e2b6f4535b',
//   cluster: 'ap2',
//   forceTLS: true
// });

export default function DashboardLayout() {
  const { themeLayout } = useSettingsContext();

  const isDesktop = useResponsive('up', 'lg');

  const [open, setOpen] = useState(false);

  const isNavHorizontal = themeLayout === 'horizontal';

  const isNavMini = themeLayout === 'mini';


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // fetch data hear

  const dispatch = useDispatch()
  useEffect(() => {

    dispatch(fetchAdminUsers())
    dispatch(fetchCustomer())
    dispatch(fetchOrientation())
    dispatch(fetchSize())
    dispatch(fetchcountryzone())
    dispatch(fetchsheet())
    dispatch(fetchcovers())
    dispatch(fetchcoversupgrades())
    dispatch(fetchboxsleeveupgradesReq())
    dispatch(fetchcolors())
    dispatch(fetchboxsleeve())
    dispatch(fetchproduct())
    dispatch(fetchpaper())
    dispatch(fetchOrder())

    api.customerApi.Read().then((e)=>{
      console.log(e.data);
    })

  }, [])

  // useEffect(() => {
  //   echo.channel('newcostomerreqest')
  //     .listen('newcostomerrequist', (e) => {
  //       // Alert.success('Order Created')
  //       dispatch(fetchCustomer())
  //     })
  //     .listen('OrderUpdated', (e) => {
  //       // Alert.success('Order Updated')
  //     })
  //     .listen('OrderDeleted', (e) => {
  //       // Alert.success('Order Deleted')
  //     })
  // }, [])

  const renderNavVertical = <NavVertical openNav={open} onCloseNav={handleClose} />;

  if (isNavHorizontal) {
    return (
      <>
        <Header onOpenNav={handleOpen} />

        {isDesktop ? <NavHorizontal /> : renderNavVertical}

        <Main>

          <Outlet />
        </Main>
      </>
    );
  }

  if (isNavMini) {
    return (
      <>
        <Header onOpenNav={handleOpen} />

        <Box
          sx={{
            display: { lg: 'flex' },
            minHeight: { lg: 1 },
          }}
        >
          {isDesktop ? <NavMini /> : renderNavVertical}

          <Main>

            <Outlet />
          </Main>
        </Box>
      </>
    );
  }

  return (
    <>
      <Header onOpenNav={handleOpen} />

      <Box
        sx={{
          display: { lg: 'flex' },
          minHeight: { lg: 1 },
        }}
      >
        {renderNavVertical}

        <Main>

          <Outlet />
        </Main>
      </Box>
    </>
  );
}
