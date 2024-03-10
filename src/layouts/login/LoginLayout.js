import PropTypes from 'prop-types';
// @mui
import { Typography, Stack } from '@mui/material';
// components
import Logo from '../../components/logo';
import Image from '../../components/image';
//
import { StyledRoot, StyledSectionBg, StyledSection, StyledContent } from './styles';

// ----------------------------------------------------------------------

LoginLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  illustration: PropTypes.string,
};

export default function LoginLayout({ children, illustration, title }) {
  return (
    <StyledRoot>
      <Logo
        sx={{
          zIndex: 9,
          position: 'absolute',
          mt: { xs: 1.5, md: 5 },
          ml: { xs: 2, md: 5 },
        }}
      />

      <StyledSection sx={{ width: '50%' }}>
        <Typography variant="h3" sx={{ mb: 6, textAlign: 'center' }}>
          {title || 'Photokrafft Admin Panel'}
        </Typography>

        <Image
          disabledEffect
          visibleByDefault
          alt="auth"
          src={illustration || '/assets/illustrations/illustration_dashboard.png'}
          sx={{ maxWidth: "50%" }}
        />

        <StyledSectionBg />
      </StyledSection>

      <StyledContent  sx={{ width: '50%'}}>
        <Stack sx={{ width: "25em" }}> {children} </Stack>
      </StyledContent>
      
    </StyledRoot>
  );
}
