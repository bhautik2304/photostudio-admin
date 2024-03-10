import { useState } from 'react';
import * as Yup from 'yup';
import { Navigate, Link as RouterLink, useNavigate, useNavigation } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, Alert, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
// routes
import { PATH_AUTH, PATH_DASHBOARD } from '../../routes/paths';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// components
import Iconify from '../../components/iconify';
import FormProvider, { RHFTextField } from '../../components/hook-form';
import { apiRoutes } from '../../constants';
import { login } from '../../redux/slices/AuthSlice';

// ----------------------------------------------------------------------

export default function AuthLoginForm() {

  const [showPassword, setShowPassword] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [errors, setErrors] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const onSubmit = async () => {
    setSubmit(true)

    axios.post(apiRoutes.login, formData)
      .then((e) => {
        dispatch(login(e.data))
        if (e.data.code === 200) {
          console.log("successfully");
          navigate(PATH_DASHBOARD.dashbord, { replace: true })
          setSubmit(false)
          return
        }
        setSubmit(false)
      })
      .catch((e) => {
        console.log(e)
        setSubmit(false)
        // setErrors()
      })
  };

  const { errorMsg } = useSelector(state => state.auth)

  return (
    <>
      <Stack spacing={3}>
        {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

        <TextField name="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} label="Email address" />

        <TextField
          name="password"
          label="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack alignItems="flex-end" sx={{ my: 2 }}>
        <Link
          component={RouterLink}
          to={PATH_AUTH.resetPassword}
          variant="body2"
          color="inherit"
          underline="always"
        >
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        onClick={() => onSubmit()}
        loading={submit}
        sx={{
          bgcolor: 'text.primary',
          color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          '&:hover': {
            bgcolor: ()=>'text.primary',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          },
        }}
      >
        Login
      </LoadingButton>
    </>
  );
}
