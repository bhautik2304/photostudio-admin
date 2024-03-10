import React, { useState } from 'react'
import PropTypes from 'prop-types';
// @mui
import { Button, List, Stack } from '@mui/material';
import { useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';
// locales
import { useLocales } from '../../../locales';
//
import { StyledIcon, StyledItem, StyledSubheader } from './styles';
import NavList from './NavList';
import SvgColor from '../../svg-color';
import { useAuthContext } from '../../../auth/useAuthContext';
import { PATH_DASHBOARD, PATH_AUTH } from '../../../routes/paths';
// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

NavSectionVertical.propTypes = {
  sx: PropTypes.object,
  data: PropTypes.array,
};

export default function NavSectionVertical({ data, sx, ...other }) {
  const [openPopover, setOpenPopover] = useState(null);
  const { translate } = useLocales();
  const navigate = useNavigate()
  const { logout } = useAuthContext()

  const { enqueueSnackbar } = useSnackbar();

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleLogout = async () => {
    try {
      logout();
      navigate(PATH_AUTH.login, { replace: true });
      handleClosePopover();
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };

  return (
    <Stack sx={sx} {...other}>
      {data.map((group) => {
        const key = group.subheader || group.items[0].title;

        return (
          <List key={key} disablePadding sx={{ px: 2 }}>
            {group.subheader && (
              <StyledSubheader disableSticky>{`${translate(group.subheader)}`}</StyledSubheader>
            )}

            {group.items.map((list) => (
              <NavList
                key={list.title + list.path}
                data={list}
                depth={1}
                hasChild={!!list.children}
              />
            ))}
            {/* <StyledItem onClick={() => alert("hello")} >
            </StyledItem> */}
          </List>
        );
      })}
    </Stack>
  );
}
