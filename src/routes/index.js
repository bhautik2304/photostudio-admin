import { Navigate, useRoutes } from 'react-router-dom';
// auth
import AuthGuard from '../auth/AuthGuard';
import GuestGuard from '../auth/GuestGuard';
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
        { path: 'resorces', element: <Resource /> },
        { path: 'currency-zone', element: <Currencyzone /> },
        // setting
        { path: 'setting', element: <SettingPage />, },
        { path: '/setting/adminuser', element: <AdminUser /> },
        { path: 'adminuser/:id', element: <SettingPage /> },
        // customers
        { path: 'customer/', element: <CustomerListPage />, },
        { path: 'customer/profile/:id', element: <CustomerProfile /> },
        // products
        { path: 'products', element: <ProductList /> },
        { path: 'products/edit/:id', element: <EditeProduct /> },
        // orders
        { path: 'orders', element: <Orders />, },
        { path: 'orders/detail/:id', element: <OrderEditeage /> },
      ],
    },
  ]);
}
