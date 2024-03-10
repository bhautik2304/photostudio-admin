import React, { useState } from 'react'
import { Button, MenuItem, DialogTitle, Select,InputLabel, FormControl, Dialog, DialogActions, DialogContent, Stack, TextField, Table, TableBody, TableCell, TableContainer, TableRow, IconButton, Checkbox, Card } from '@mui/material'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import { useDispatch, useSelector } from 'react-redux'

import { fetchcovers } from '../../../../redux/thunk'
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
  // { id: 'value', label: 'Value', align: 'left' },
  { id: 'created_at', label: 'Created at', align: 'left' },
  { id: '', label: '', align: 'left' },
];
const coverData = {
  name: '',
  type: '',
  img: '',
}

function Cover() {


  const [open, setOpen] = useState(false)
  const [update, setUpdate] = useState(false)
  const [data, setData] = useState(coverData)
  const disapatch = useDispatch()
  const { cover } = useSelector(state => state.resource)
  const [openPopover, setOpenPopover] = useState(null);

  // create orientation 


  const submit = () => {
    // const id = toast.loading("Please wait...")
    console.log(data);

    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('type', data.type)
    formData.append('img', data.img)
    axios.post(apiRoutes.coversReq, formData).then(res => {
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
        disapatch(fetchcovers())
        setData(coverData)
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
    formDatas.append('type', data.type)
    formDatas.append('img', data.img)

    axios.post(`${apiRoutes.coversReq}update/${data.id}`, formDatas).then(res => {
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
        disapatch(fetchcovers())
        setData(coverData)
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
    axios.delete(apiRoutes.coversReq + ids).then(res => {
      console.log(res.data);

      // error logic
      if (!res.status === 200) {
        // toast.update(id, { render: "some thing went wrong", type: "error", isLoading: false });
        setTimeout(() => {
          // toast.dismiss(id)
        }, 5000);
        return
      }

      // success logic 
      if (res.data.success) {
        // toast.update(id, { render: res.data.message, type: "success", isLoading: false });
        disapatch(fetchcovers())
        setTimeout(() => {
          // toast.dismiss(id)
        }, 5000);
        return
      }

      // api error logic 
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
        <b>Covers</b>
        <Button variant="contained" onClick={() => {
          setUpdate(false)
          setData(cover)
          setOpen(!open)
        }} color="primary">Create Cover</Button>
      </Stack>
      {/* <Card> */}
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <Scrollbar>
            <Table stickyHeader aria-label="sticky table">
              <TableHeadCustom headLabel={TABLE_HEAD} />
              <TableBody>

                {cover ? cover.map((row, key) =>
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
                            sx={{ borderRadius: 1.5, width: 48, height: 48,marginRight:2.5 }}
                          />
                          {row.name}
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
          Create New Cover
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ marginTop: 1 }}>
            <TextField fullWidth label='Cover Name' onChange={(e) => setData({ ...data, name: e.target.value })} value={data.name} />
            {/* <Select name="" onChange={(e) => setData({ ...data, type: e.target.value })} id="">
              <MenuItem value="img">Single Image + Option + Colors</MenuItem>
              <MenuItem value="leather">Option + Colors</MenuItem>
              <MenuItem value="both_side_image_no_leather_option">Both Side Image + No Option</MenuItem>
            </Select> */}
            <FormControl fullWidth sx={{ textAlign: 'left' }}>
              <InputLabel id="demo-simple-select-helper-label" sx={{ backgroundColor: '#fff', paddingLeft: 1, paddingRight: 1 }}>Type</InputLabel>
              <Select name="" onChange={(e) => setData({ ...data, type: e.target.value })} id="" label='Type' sx={{ color: '#000' }}>
                <MenuItem value="img">img</MenuItem>
                <MenuItem value="regular">regular</MenuItem>
                <MenuItem value="canvas">canvas</MenuItem>
                <MenuItem value="acrylic">acrylic</MenuItem>
              </Select>
            </FormControl>
            <TextField type='file' fullWidth placeholder='Orientation Name' onChange={(e) => setData({ ...data, img: e.target.files[0] })} />
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

export default Cover

/*
<Select name="" onChange={(e) => setData({ ...data, type: e.target.value })} id="">
              <MenuItem value="img">Front & Back img</MenuItem>
              <MenuItem value="leather">Single Img + leather option</MenuItem>
              <MenuItem value="canvas">Only lether Option</MenuItem>
              <MenuItem value="acrylic">Febric Regular</MenuItem>
            </Select>
*/