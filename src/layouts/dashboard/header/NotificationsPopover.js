import PropTypes from 'prop-types';
import { noCase } from 'change-case';
import { useEffect, useState } from 'react';
// @mui
import {
  Box,
  Stack,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  IconButton,
  Typography,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
  Drawer
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
// utils
import { fToNow, fDateTime } from '../../../utils/formatTime';
// _mock_
import { _notifications } from '../../../_mock/arrays';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import MenuPopover from '../../../components/menu-popover';
import { IconButtonAnimate } from '../../../components/animate';
import { api } from '../../../Api/api';
import { fetchNotifications } from '../../../redux/thunk';

// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  const [openPopover, setOpenPopover] = useState(null);

  const [notifications, setNotifications] = useState(_notifications);


  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isUnRead: false,
      }))
    );
  };

  const dispatch = useDispatch()
  const { notification } = useSelector((data) => data.notification)
  // useEffect(()=>)
  const totalUnRead = notification.filter((item) => item.status === true).length;

  return (
    <>
      <IconButtonAnimate
        color={openPopover ? 'primary' : 'default'}
        onClick={handleOpenPopover}
        sx={{ width: 40, height: 40 }}
      >
        <Badge badgeContent={notification.filter((item) => item.status === 0).length} color="error">
          <Iconify icon="eva:bell-fill" />
        </Badge>
      </IconButtonAnimate>

      <Drawer open={openPopover} onClose={handleClosePopover}>
        <Box sx={{ width: 500, height: '100%', p: 0 }} >
          <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1">Notifications</Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                You have {notification.filter((item) => item.status === 0).length} unread messages
              </Typography>
            </Box>

            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={() =>
                api.notifications.readAll().then(() => {
                  dispatch(fetchNotifications())
                })}>
                <Iconify icon="eva:done-all-fill" />
              </IconButton>
            </Tooltip>
            <Tooltip title=" Delete all">
              <IconButton color="error" onClick={() => api.notifications.deleteAll().then(() => {
                dispatch(fetchNotifications())
              })}>
                <Iconify icon="eva:trash-fill" />
              </IconButton>
            </Tooltip>
          </Box>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
            <List
              disablePadding
              subheader={
                <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                  Latest
                </ListSubheader>
              }
            >
              {notification.slice().reverse().map((notificationss) => {
                console.log(notificationss);
                return (
                  <NotificationItem key={notification.id} notification={notificationss} />
                )
              })}
            </List>

            {/* <List
              disablePadding
              subheader={
                <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                  Before that
                </ListSubheader>
              }
            >
              {notification.slice(2, 5).map((notificationss) => (
                <NotificationItem key={notification.id} notification={notificationss} />
              ))}
            </List> */}
          </Scrollbar>

          <Divider sx={{ borderStyle: 'dashed' }} />

        </Box>
        {/* <Box sx={{ p: 1 }}>
            <Button fullWidth disableRipple>
              View All
            </Button>
          </Box> */}
      </Drawer>

      {/* <MenuPopover open={openPopover} onClose={handleClosePopover} sx={{ width: 360, p: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {totalUnRead} unread messages
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                New
              </ListSubheader>
            }
          >
            {notifications.slice(0, 2).map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </List>

          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                Before that
              </ListSubheader>
            }
          >
            {notifications.slice(2, 5).map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </List>
        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple>
            View All
          </Button>
        </Box>
      </MenuPopover> */}
    </>
  );
}

// ----------------------------------------------------------------------

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    status: PropTypes.bool,
    msg: PropTypes.string,
    created_at: PropTypes.instanceOf(Date),
  }),
};

function NotificationItem({ notification }) {
  const { msg } = notification;
  console.log(notification);
  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(notification.status === 0 && {
          bgcolor: '#d5f3e6',
        }),
      }}
    >
      <ListItemAvatar>
        <img alt='' src="/assets/icons/notification/ic_mail.svg" />
      </ListItemAvatar>

      <ListItemText
        disableTypography
        primary={msg}
        secondary={
          <Stack direction="row" sx={{ mt: 0.5, typography: 'caption', color: 'text.disabled' }}>
            <Iconify icon="eva:clock-fill" width={16} sx={{ mr: 0.5 }} />
            <Typography variant="caption">{`${fToNow(notification.created_at)} ${fDateTime(notification.created_at)}`}</Typography>
          </Stack>
        }
      />
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

function renderContent(notification) {
  const title = (
    <Typography variant="subtitle2">
      {notification.msg}
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        {/* &nbsp; {noCase(notification.description)} */}
      </Typography>
    </Typography>
  );

  if (notification.type === 'order_placed') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/notification/ic_package.svg" />,
      title,
    };
  }
  if (notification.type === 'order_shipped') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/notification/ic_shipping.svg" />,
      title,
    };
  }
  if (notification.type === 'mail') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/notification/ic_mail.svg" />,
      title,
    };
  }
  if (notification.type === 'chat_message') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/notification/ic_chat.svg" />,
      title,
    };
  }
  return {
    avatar: notification.avatar ? <img alt={notification.title} src={notification.avatar} /> : null,
    title,
  };
}
