/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-self-compare */
import * as Yup from 'yup';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Grid, Card, Stack, Typography, FormControlLabel, Switch, TextField, Select, MenuItem, Button, FormControl, InputLabel, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { toast } from 'react-toastify';
// import {  } from '@mui/material';
// auth
import { useAuthContext } from '../../../../auth/useAuthContext';
// utils
import { fData } from '../../../../utils/formatNumber';
// assets
import { countries } from '../../../../assets/data';
// components
import { useSnackbar } from '../../../../components/snackbar';
import FormProvider, {
  // import { text } from './../../../../../../../../../photokrafft/photostudionextapp/public/assets/vendor/chart.js/dist/types.d';
  RHFSwitch,
  RHFSelect,
  RHFTextField,
  RHFUploadAvatar,
} from '../../../../components/hook-form';
import { apiRoutes } from '../../../../constants';
import { fetchCustomer } from '../../../../redux/slices/customer';
import Label from '../../../../components/label';
import { api } from '../../../../Api/api';
import { toastHandel } from '../../../../utils/toast';

// ----------------------------------------------------------------------

export default function AccountGeneral() {

  const { enqueueSnackbar } = useSnackbar();

  const { id } = useParams()

  const [datas, setData] = useState()
  const [zoneId, setZoneid] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [zoneUpdate, setZoneUpdate] = useState(false)
  const { customer } = useSelector(state => state.customer)
  const { countryzone } = useSelector(state => state.resource)

  const find = customer.filter(item => item.id === Number(id))[0]

  useEffect(() => {
    setData(find);
    setZoneid(find?.zone?.id)
  }, [find])


  const disapatch = useDispatch()

  const submit = () => {
    const toastId = toast.loading("Updating Zone pls wait...")
    setIsSubmitting(true)
    axios.put(apiRoutes.costomer + id, datas)
      .then(res => {
        enqueueSnackbar('Profile Updated', { variant: 'success' });
        setIsSubmitting(false)
        disapatch(fetchCustomer())
      })
      .catch(err => {
        enqueueSnackbar('Something Went Wrong', { variant: 'error' });
        setIsSubmitting(false)
      })
  }

  console.log(datas?.zone?.id);

  const updateZone = () => {
    const toastId = toast.loading("Updating Zone pls wait...")
    api.customerApi.zoneChange(datas.id, { zone: zoneId }).then((e) => {
      if (toastHandel(toastId, e.data.msg, e.data.code)) {
        disapatch(fetchCustomer())
        setZoneUpdate(false)
      }
    }).catch(e => {
      console.error('Error On Zone Update', e)
    })
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
            <Label
              color={datas?.status ? 'success' : 'error'}
              sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
            >
              {datas?.status ? "Active" : "Inactive"}
            </Label>
            <img src={datas?.compunys_logo} alt={datas?.compunys_name} style={{ width: '100%', height: '100%' }} />

            {
              datas?.approved ? (
                <FormControlLabel
                  labelPlacement="start"
                  control={
                    <Switch
                      checked={datas?.status}
                      onChange={(event) => {
                        const toastId = toast.loading(event.target.checked ? "Activating Customer pls wait..." : "Deactivatig Customer pls wait...")
                        api.customerApi.status(id, { status: event.target.checked ? 1 : 0 }).then(res => {
                          if (toastHandel(toastId, res.data.msg, res.data.code)) {
                            disapatch(fetchCustomer())
                          }
                        }
                        ).catch(err => {
                          console.error('Error On Changing Customer Status',err);
                        })
                      }}
                    />
                  }
                  label={
                    <>
                      <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                        Status
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Apply To {datas?.status === 1 ? "Inactive" : "Activate"} account
                      </Typography>
                    </>
                  }
                  sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between', textAlign: 'left' }}
                />
              ) : (

                <FormControlLabel
                  labelPlacement="start"
                  control={
                    <Switch
                      checked={datas?.approved}
                      onChange={(event) => {
                        const toastId = toast.loading("Approving Customer pls wait...")
                        api.customerApi.approved(id).then(res => {
                          if (toastHandel(toastId, res.data.msg, res.data.code)) {
                            disapatch(fetchCustomer())
                            setZoneUpdate(true)
                          }
                        }
                        ).catch(err => {
                          console.error('Error On Approved Customer', err);
                        })
                      }}
                    />
                  }
                  label={
                    <>
                      <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                        Approvals
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Apply To Approve account
                      </Typography>
                    </>
                  }
                  sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between', textAlign: 'left' }}
                />
              )

            }


            <FormControlLabel
              labelPlacement="start"
              control={
                <Switch
                  checked={true === false}
                  onChange={(event) => { }}
                />
              }
              label={
                <>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Email Verified
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Disabling this will automatically send the user a verification email
                  </Typography>
                </>
              }
              sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between', textAlign: 'left' }}
            />
            <FormControl fullWidth sx={{ textAlign: 'left' }}>
              <InputLabel id="demo-simple-select-helper-label" sx={{ backgroundColor: '#fff', paddingLeft: 1, paddingRight: 1 }}>Country zone</InputLabel>
              <Select
                fullWidth
                onChange={(e) => setZoneid(e.target.value)}
                value={zoneId || ''}
              >
                {countryzone && countryzone.map((data, key) => {
                  console.log(data);
                  return (<MenuItem key={key} value={data.id} > {data.zonename} {`( ${data.currency_sign} )`} </MenuItem>)
                })}
              </Select>
            </FormControl>
            <Button fullWidth size='large' onClick={() => updateZone()} variant='contained' sx={{ marginY: 2 }} >
              Update zone
            </Button>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 5 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <TextField value={datas?.name} label="Name" onChange={(e) => setData({ ...datas, name: e.target.value })} />

              <TextField value={datas?.email} label="Email Address" onChange={(e) => setData({ ...datas, email: e.target.value })} />

              <TextField value={datas?.phone_no} label="Phone Number" onChange={(e) => setData({ ...datas, phone_no: e.target.value })} />

              <TextField value={datas?.compunys_name} label="Company Name" onChange={(e) => setData({ ...datas, compunys_name: e.target.value })} />

              <TextField value={datas?.country} label="Country" onChange={(e) => setData({ ...datas, country: e.target.value })} />

              <TextField value={datas?.state} label="State" onChange={(e) => setData({ ...datas, state: e.target.value })} />

            </Box>
            <TextField rows={4} sx={{ marginTop: 3 }} multiline fullWidth value={datas?.address} onChange={(e) => setData({ ...datas, address: e.target.value })} label="Address" />

            <TextField value={datas?.social_link_1} sx={{ marginTop: 3 }} label="Social Link 1" fullWidth onChange={(e) => setData({ ...datas, social_link_1: e.target.value })} />
            <TextField value={datas?.social_link_2} sx={{ marginTop: 3 }} label="Social Link 2" fullWidth onChange={(e) => setData({ ...datas, social_link_2: e.target.value })} />


            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>

              <LoadingButton variant="contained" onClick={() => submit()} loading={isSubmitting}>
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
      <Dialog
        open={zoneUpdate}
        onClose={() => {
          setZoneUpdate(false)
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle>
          Allocate Zone
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">Country zone</InputLabel>
              <Select
                sx={{ width: 400 }}
                onChange={(e) => setZoneid(e.target.value)}
                value={zoneId || ''}
              >
                {countryzone && countryzone.map((data, key) => {
                  console.log(data);
                  return (<MenuItem key={key} value={data.id} > {data.zonename} {`( ${data.currency_sign} )`} </MenuItem>)
                })}
              </Select>
            </FormControl>
          </Stack>
          <DialogActions>
            <Button fullWidth size='large' onClick={() => updateZone()} variant='contained' >
              Allote
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog >
    </>
  );
}
