/* eslint-disable no-plusplus */
import React, { useState } from 'react'
import { Button, MenuItem,Autocomplete, DialogTitle, Dialog, DialogActions, DialogContent, Stack, TextField, Table, TableBody, TableCell, TableContainer, TableRow, IconButton, Checkbox, Card } from '@mui/material'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import { useDispatch, useSelector } from 'react-redux'

import { fetchcoversupgrades } from '../../../../redux/thunk'
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
const colorData = {
  id: generateRandomId(),
  name: '',
  code: '',
  img: ''
};

const coverupgardeData = {
  name: '',
  cover_id: '',
  img: '',
  colors: [],
};

function CoverUpgrade() {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [data, setData] = useState(coverupgardeData);
  const dispatch = useDispatch();
  const { cover, coverupgrade,color } = useSelector(state => state.resource);
  const [openPopover, setOpenPopover] = useState(null);


  const submit = () => {
    // const id = toast.loading('Please wait...');
    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('img', data.img);
    formData.append('cover_id', data.cover_id);
    // formData.append('colors', data.cover_id);

    // Iterate through colors array
    data.colors.forEach((colors, index) => {
      console.log(colors);
      formData.append(`colors[${index}]`, colors);
    });


    axios.post(apiRoutes.coversupgradesReq, formData)
      .then(res => handleResponse(res, null, 'create'))
      .catch(handleError);
  };

  const updateOrientation = () => {
    // const id = toast.loading('Please wait...');
    const formDatas = new FormData();
    formDatas.append('name', data.name);
    formDatas.append('img', data.img);

    axios.post(`${apiRoutes.coversupgradesReq}update/${data.id}`, formDatas)
      .then(res => handleResponse(res, null, 'update'))
      .catch(handleError);
  };

  const handleResponse = (res, id = null, action) => {
    if (res.status !== 200 || !res.data.success) {
      handleError(id);
      return;
    }

    if (action === 'create') {
      // toast.update(id, { render: res.data.message, type: 'success', isLoading: false });
    } else if (action === 'update') {
      setUpdate(false);
      // toast.update(id, { render: res.data.message, type: 'success', isLoading: false });
    } else if (action === 'delete') {
      // toast.update(id, { render: res.data.message, type: 'success', isLoading: false });
    }

    setOpen(false);
    dispatch(fetchcoversupgrades());
    setData(coverupgardeData);
    setTimeout(() => {
      // toast.dismiss(id);
    }, 5000);
  };

  const handleError = err => {
    console.log(err);
    // toast.error('Something went wrong');
  };

  const deleteFnc = ids => {
    // const id = toast.loading('Please wait...');
    axios.delete(apiRoutes.coversupgradesReq + ids)
      .then(res => handleResponse(res, null, 'delete'))
      .catch(handleError);
  };

  const handleColorDelete = (index) => {
    const updatedColors = [...data.colors];
    updatedColors.splice(index, 1); // Remove the color at the specified index
    setData({ ...data, colors: updatedColors });
  };

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  }; 

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <Card>
      <Stack spacing={2} className='my-3' sx={{ p: 2 }} direction='row' alignItems='center' justifyContent='space-between'  >
        <b>Covers Upgrade</b>
        <Button variant="contained" onClick={() => {
          setUpdate(false)
          setData(cover)
          setOpen(!open)
        }} color="primary">Create Cover Upgrade</Button>
      </Stack>
      {/* <Card> */}
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <Scrollbar>
            <Table stickyHeader aria-label="sticky table">
              <TableHeadCustom headLabel={TABLE_HEAD} />
              <TableBody>

                {coverupgrade ? coverupgrade.map((row, key) =>
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
                      sx={{ width: 140, boxShadow: 'none' }}
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
          Create New Cover Upgrade
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ marginTop: 1 }}>
          <Autocomplete
              id="multiple-limit-tags"
              options={cover.map((datas)=>({title:datas.name,id:datas.id}))}
              getOptionLabel={(option) => option.title}
              onChange={(d,newValue)=>{
                setData((prevData) => ({...prevData,cover_id:newValue.id}));
              }}
              // defaultValue={[top100Films[13], top100Films[12], top100Films[11]]}
              renderInput={(params) => (
                <TextField {...params} label="Select Cover" placeholder="Cover" />
              )}
              sx={{ width: '500px' }}
            />
            <TextField fullWidth label='Cover Option Name' onChange={(e) => setData({ ...data, name: e.target.value })} value={data.name} />
            <TextField type='file' fullWidth placeholder='Orientation Name' onChange={(e) => setData({ ...data, img: e.target.files[0] })} />
            <Autocomplete
              multiple
              id="multiple-limit-tags"
              options={color.map((datas)=>({title:datas.color,id:datas.id}))}
              getOptionLabel={(option) => option.title}
              onChange={(d,newValue)=>{
                setData((prevData) => ({
                  ...prevData,
                  colors: newValue.map((selectedColor) => selectedColor.id),
                }));
              }}
              // defaultValue={[top100Films[13], top100Films[12], top100Films[11]]}
              renderInput={(params) => (
                <TextField {...params} label="Select Color" placeholder="Color" />
              )}
              sx={{ width: '500px' }}
            />
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

export default CoverUpgrade

function generateRandomId(length = 8) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomId = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomId += characters.charAt(randomIndex);
  }

  return randomId;
}