import React, { useState } from 'react'
import { Button, MenuItem, DialogTitle, Dialog, DialogActions, DialogContent, Stack, TextField, Table, TableBody, TableCell, TableContainer, TableRow, IconButton, Checkbox, Card, Typography } from '@mui/material'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import { useDispatch, useSelector } from 'react-redux'

import { fetchSize } from '../../../../redux/thunk'
import { apiRoutes } from '../../../../constants'
import {
  TableNoData,
  TableHeadCustom,
} from '../../../../components/table';
import Scrollbar from '../../../../components/scrollbar';
import Iconify from '../../../../components/iconify';
import Image from '../../../../components/image';
import MenuPopover from '../../../../components/menu-popover';
import { fDate } from '../../../../utils/formatTime';

const TABLE_HEAD = [
  { id: '#', label: '#', align: 'left' },
  { id: 'name', label: 'Name', align: 'left' },
  // { id: 'value', label: 'Size', align: 'left' },
  { id: 'created_at', label: 'Created at', align: 'left' },
  { id: '', label: '', align: 'left' },
];

const sizeData = {
  name: '',
  img: ''
}

function Size() {
  const [open, setOpen] = useState(false)
  const [update, setUpdate] = useState(false)
  const [data, setData] = useState(sizeData)
  const disapatch = useDispatch()
  const { size } = useSelector(state => state.resource)
  const [openPopover, setOpenPopover] = useState(null);

  // create orientation 

  const submit = () => {
    // const id = toast.loading("Please wait...")
    console.log(data);

    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('img', data.img)
    axios.post(apiRoutes.sizeReq, formData).then(res => {
      // console.log(res)
      if (!res.status === 200) {
        // toast.update(id, { render: "some thing went wrong", type: "error", isLoading: false });
        setOpen(!open)
        setTimeout(() => {
          // toast.dismiss(id)
        }, 5000);
        return
      }
      if (res.data.success) {
        disapatch(fetchSize())
        setData(sizeData)
        setOpen(!open)

        // toast.update(id, { render: res.data.message, type: "success", isLoading: false });
        setTimeout(() => {
          // toast.dismiss(id)
        }, 5000);
      }
      // toast.error(res.data.message)
    }).catch(err => {
      console.log(err)
      // toast.update(id, { render: "some thing went wrong", type: "error", isLoading: false });
      setTimeout(() => {
        // toast.dismiss(id)
      }, 5000);
    })
  }

  // update orientation

  const updateOrientation = () => {
    console.log(data);

    // const id = toast.loading("Please wait...")
    const formDatas = new FormData()
    formDatas.append('name', data.name)
    formDatas.append('img', data.img)

    axios.post(`${apiRoutes.sizeReq}update/${data.id}`, formDatas).then(res => {
      if (!res.status === 200) {
        setUpdate(false)
        setOpen(!open)
        // toast.update(id, { render: "some thing went wrong", type: "error", isLoading: false });
        setTimeout(() => {
          // toast.dismiss(id)
        }, 5000);
        return
      }
      if (res.data.success) {
        disapatch(fetchSize())
        setData(sizeData)
        setUpdate(false)
        setOpen(!open)
        // toast.update(id, { render: res.data.message, type: "success", isLoading: false });
        setTimeout(() => {
          // toast.dismiss(id)
        }, 5000);
        return
      }
      // toast.update(id, { render: res.data.message, type: "error", isLoading: false });
      setTimeout(() => {
        // toast.dismiss(id)
      }, 5000);
    }).catch(err => {
      console.log(err)
      // toast.update(id, { render: "some thing went wrong", type: "error", isLoading: false });
      setTimeout(() => {
        // toast.dismiss(id)
      }, 5000);
    })
  }

  // delete orientation
  const deleteFnc = (ids) => {
    // const id = toast.loading("Please wait...")
    axios.delete(apiRoutes.sizeReq + ids).then(res => {
      console.log(res.data);
      if (!res.status === 200) {
        // toast.update(id, { render: "some thing went wrong", type: "error", isLoading: false });
        setTimeout(() => {
          // toast.dismiss(id)
        }, 5000);
        return
      }
      if (res.data.success) {
        // toast.update(id, { render: res.data.message, type: "success", isLoading: false });
        disapatch(fetchSize())
        setTimeout(() => {
          // toast.dismiss(id)
        }, 5000);
        return
      }
      // toast.update(id, { render: res.data.message, type: "error", isLoading: false });
      setTimeout(() => {
        // toast.dismiss(id)
      }, 5000);
    }).catch(err => {
      console.log(err)
      // toast.update(id, { render: "some thing went wrong", type: "error", isLoading: false });
      setTimeout(() => {
        // toast.dismiss(id)
      }, 5000);
    })
  }

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <Card>
      <Stack spacing={2} className='my-3' sx={{ p: 2 }} direction='row' alignItems='center' justifyContent='space-between'  >
        <b>Size</b>
        <Button variant="contained" onClick={() => {
          setUpdate(false)
          setData(size)
          setOpen(!open)
        }} color="primary">Create size</Button>
      </Stack>
      {/* <Card> */}
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <Scrollbar>
            <Table stickyHeader aria-label="sticky table">
              <TableHeadCustom headLabel={TABLE_HEAD} />
              <TableBody>

                {size ? size.map((row, key) =>
                  <>
                    <TableRow hover>
                      <TableCell padding="checkbox">
                        <Checkbox />
                      </TableCell>

                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Image
                            disabledEffect
                            visibleByDefault
                            alt={row.name}
                            src={row.img}
                            sx={{ borderRadius: 1.5, width: 48, height: 48 }}
                          />
                          <Typography sx={{marginY:5}} >
                            {row.name}
                          </Typography>
                        </Stack>
                      </TableCell>

                      {/* <TableCell>{row.value}</TableCell> */}
                      <TableCell>{fDate(row.created_at)}</TableCell>

                      {/* <TableCell align="right">{fCurrency(price)}</TableCell> */}

                      <TableCell align="right">
                        <IconButton color={openPopover ? 'primary' : 'default'} onClick={handleOpenPopover}>
                          <Iconify icon="eva:more-vertical-fill" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <MenuPopover
                      open={openPopover}
                      onClose={handleClosePopover}
                      arrow="right-top"
                      sx={{ width: 140,boxShadow:'none' }}
                    >
                      <MenuItem
                        onClick={() => {
                          deleteFnc(row.id)
                          handleClosePopover();
                        }}
                        sx={{ color: 'error.main' }}
                      >
                        <Iconify icon="eva:trash-2-outline" />
                        Delete
                      </MenuItem>

                      <MenuItem
                        onClick={() => {
                          setData(row);
                          setUpdate(!update);
                          setOpen(!open);
                          handleClosePopover();
                        }}
                      >
                        <Iconify icon="eva:edit-fill" />
                        Edit
                      </MenuItem>
                    </MenuPopover>
                  </>
                ) : <TableNoData isNotFound={1} />}
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>
      {/* </Card> */}
      {/* crete modal */}
      <Dialog
        open={open}
        onClose={() => {
          setUpdate(false)
          setOpen(!open)
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle>
          Create New Size
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ marginTop: 1 }}>
            <TextField fullWidth label='Size' onChange={(e) => setData({ ...data, name: e.target.value })} value={data.name} />
            <TextField type='file' fullWidth placeholder='Size Name' onChange={(e) => setData({ ...data, img: e.target.files[0] })} />
          </Stack>
          <DialogActions>
            {update ?
              <div className="my-3">
                <Button variant="contained" fullWidth color="warning" onClick={updateOrientation} >Update</Button>
              </div> :
              <div className="my-3">
                <Button variant="contained" fullWidth color="primary" onClick={submit} >Create</Button>
              </div>}
          </DialogActions>
        </DialogContent>
      </Dialog >
    </Card>
  )
}

export default Size