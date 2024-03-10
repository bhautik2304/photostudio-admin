import { Suspense, lazy } from 'react';
// components
import LoadingScreen from '../components/loading-screen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) =>
(
  <Suspense fallback={<LoadingScreen />}>
    <Component {...props} />
  </Suspense>
);

// ----------------------------------------------------------------------

// AUTH
// export const RegisterPage = Loadable(lazy(() => import('../pages/auth/RegisterPage')));
export const LoginPage = Loadable(lazy(() => import('../pages/auth/LoginPage')));
export const VerifyCodePage = Loadable(lazy(() => import('../pages/auth/VerifyCodePage')));
export const NewPasswordPage = Loadable(lazy(() => import('../pages/auth/NewPasswordPage')));
export const ResetPasswordPage = Loadable(lazy(() => import('../pages/auth/ResetPasswordPage')));

// DASHBOARD: GENERAL
export const DashbordPage = Loadable(
  lazy(() => import('../pages/dashboard/DashbordPage'))
);

export const SettingPage = Loadable(
  lazy(() => import('../pages/dashboard/Settings/SettingPage'))
);
export const AdminUser = Loadable(
  lazy(() => import('../pages/dashboard/Settings/AdminUser/AdminUser'))
);

export const CustomerProfile = Loadable(
  lazy(() => import('../pages/dashboard/Customer/CustomerProfile'))
);
export const CustomerListPage = Loadable(lazy(() => import('../pages/dashboard/Customer/CustomerListPage')));
export const Resource = Loadable(
  lazy(() => import('../pages/dashboard/Resource'))
);
export const Orders = Loadable(
  lazy(() => import('../pages/dashboard/Orders'))
);

export const OrderDetaild = Loadable(
  lazy(() => import('../pages/dashboard/Orders/OrderDetaild'))
);

export const OrderEditeage = Loadable(
  lazy(() => import('../pages/dashboard/Orders/OrderEditeage'))
);


export const EditeProduct = Loadable(
  lazy(() => import('../pages/dashboard/Settings/Product/ProductCrud'))
);
export const ProductList = Loadable(
  lazy(() => import('../pages/dashboard/Settings/Product'))
);
export const Currencyzone = Loadable(
  lazy(() => import('../pages/dashboard/Currencyzone/Currencyzone'))
);

