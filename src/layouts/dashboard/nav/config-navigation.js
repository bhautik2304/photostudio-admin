// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/label';
import Iconify from '../../../components/iconify';
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: icon('ic_blog'),
  cart: icon('ic_cart'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
  setting: icon('gear-fill'),
  product: icon('ic_box'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: '',
    items: [
      { title: 'Dashbord', path: PATH_DASHBOARD.dashbord, icon: ICONS.dashboard },
      { title: 'Customer Manager', path: PATH_DASHBOARD.customer.root, icon: ICONS.user },
      { title: 'Orders', path: PATH_DASHBOARD.orders.root, icon: ICONS.cart, },
      // { title: 'Setting', path: PATH_DASHBOARD.settings.setting, icon: ICONS.setting },
      { title: 'All Products', path: PATH_DASHBOARD.products.root, icon: ICONS.ecommerce },
      { title: 'Product Resources', path: PATH_DASHBOARD.resorces, icon: ICONS.folder },
      { title: 'Currency Zone', path: PATH_DASHBOARD.currencyZone, icon: ICONS.banking },
      { title: 'Admin Settings', path: PATH_DASHBOARD.setting.root, icon: ICONS.setting },
    ],
  },
];

export default navConfig;