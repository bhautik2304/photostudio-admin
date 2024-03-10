import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';
// @mui
import { Stack, Button, Typography, Box } from '@mui/material';
// auth
import { useAuthContext } from '../../../auth/useAuthContext';
// locales
import { useLocales } from '../../../locales';
// routes
import { PATH_AUTH, PATH_DOCS } from '../../../routes/paths';
import { StyledIcon, StyledItem, StyledSubheader } from './styles';
import SvgColor from '../../../components/svg-color';
// ----------------------------------------------------------------------
const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);
export default function NavDocs() {
  const [openPopover, setOpenPopover] = useState(null);
  const { user } = useAuthContext();

  const { translate } = useLocales();
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar();

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const { logout } = useAuthContext()

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
    <Stack
      spacing={3}
      sx={{
        px: 5,
        pb: 5,
        mt: 10,
        width: 1,
        display: 'block',
        textAlign: 'center',
      }}
    >
      <Box component="img" src="/assets/illustrations/illustration_docs.svg" />

      <div>
        <Typography gutterBottom variant="subtitle1">
          {`${translate('docs.hi')}, Photokrafft.com`}
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary', whiteSpace: 'pre-line' }}>
          Need help?
          Please contact us.
        </Typography>
      </div>

      <Button onClick={() => handleLogout()} target="_blank" color='error' startIcon={<StyledIcon color='red' >{icon('power-solid')}</StyledIcon>} rel="noopener" variant="contained">
        Logout
      </Button>
    </Stack>
  );
}
