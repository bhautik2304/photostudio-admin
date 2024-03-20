import { Navigate, useRoutes } from 'react-router-dom';
// auth
import AuthGuard from '../auth/AuthGuard';
import GuestGuard from '../auth/GuestGuard';
import RoleBasedGuard from '../auth/RoleBasedGuard';
// layouts
import MainLayout from '../layouts/main';
import SimpleLayout from '../layouts/simple';
import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';
// config
import { PATH_AFTER_LOGIN } from '../config-global';
//
import {  // custom pages
  SettingPage,
  Resource,
  Orders,
  // Auth
  LoginPage,
  VerifyCodePage,
  NewPasswordPage,
  ResetPasswordPage,
  // Dashboard: General
  DashbordPage,
  CustomerListPage,
  CustomerProfile,
  AdminUser,
  OrderEditeage,
  EditeProduct,
  ProductList,
  Currencyzone
} from './elements';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // Auth
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <LoginPage />
          ),
        },
        {
          element: <CompactLayout />,
          children: [
            { path: 'reset-password', element: <ResetPasswordPage /> },
            { path: 'new-password', element: <NewPasswordPage /> },
            { path: 'verify', element: <VerifyCodePage /> },
          ],
        },
      ],
    },

    // Dashboard
    {
      path: '/',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        // { path: 'app', element: <GeneralAppPage /> },
        { path: 'app', element: <DashbordPage /> },
        {
          path: 'resorces', element:
            <RoleBasedGuard roles={['masteradmin']} >
              <Resource />
            </RoleBasedGuard>
        },
        {
          path: 'currency-zone', element:
            <RoleBasedGuard roles={['masteradmin']} >
              <Currencyzone />
            </RoleBasedGuard>
        },
        // setting
        {
          path: 'setting', element:
            <RoleBasedGuard roles={['masteradmin']} >
              <SettingPage />
            </RoleBasedGuard>
          ,
        },
        {
          path: '/setting/adminuser', element:
            <RoleBasedGuard roles={['masteradmin']} >
              <AdminUser />
            </RoleBasedGuard>
        },
        {
          path: 'adminuser/:id', element:
            <RoleBasedGuard roles={['masteradmin']} >
              <SettingPage />
            </RoleBasedGuard>
        },
        // customers
        {
          path: 'customer/', element:
            <RoleBasedGuard roles={['masteradmin','user']} >
              <CustomerListPage />
            </RoleBasedGuard>
        },
        {
          path: 'customer/profile/:id', element:
            <RoleBasedGuard roles={['masteradmin','user']} >
              <CustomerProfile />
            </RoleBasedGuard>
        },
        // products
        {
          path: 'products', element:
            <RoleBasedGuard roles={['masteradmin']} >
              <ProductList />
            </RoleBasedGuard>
        },
        {
          path: 'products/edit/:id', element:
            <RoleBasedGuard roles={['masteradmin']} >
              <EditeProduct />
            </RoleBasedGuard>
        },
        // orders
        {
          path: 'orders', element:
            <RoleBasedGuard roles={['masteradmin','user']} >
              <Orders />
            </RoleBasedGuard>
        },
        {
          path: 'orders/detail/:id', element:
            <RoleBasedGuard roles={['masteradmin','user']} >
              <OrderEditeage />
            </RoleBasedGuard>
        },
      ],
    },
  ]);
}
