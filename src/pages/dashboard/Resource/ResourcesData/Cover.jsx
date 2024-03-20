import React, { useState } from 'react';
import {
  Button,
  MenuItem,
  DialogTitle,
  Select,
  InputLabel,
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  IconButton,
  Checkbox,
  Card,
} from '@mui/material';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';

import { fetchcovers } from '../../../../redux/thunk';
import { apiRoutes } from '../../../../constants';
import { TableNoData, TableHeadCustom } from '../../../../components/table';
import Scrollbar from '../../../../components/scrollbar';
import Iconify from '../../../../components/iconify';
import Image from '../../../../components/image';
import MenuPopover from '../../../../components/menu-popover';
import { fDate } from '../../../../utils/formatTime';
import { api } from '../../../../Api/api';

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
};

function Cover() {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [data, setData] = useState(coverData);
  const disapatch = useDispatch();
  const { cover } = useSelector((state) => state.resource);
  const [openPopover, setOpenPopover] = useState(null);

  // create orientation
  const submit = () => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('type', data.type);
    formData.append('img', data.img);
    api.productResourceApi.covers.Create(formData, () => {
      disapatch(fetchcovers());
      setData(coverData);
      setOpen(!open);
    });
  };

  // update orientation
  const updateOrientation = () => {
    const formDatas = new FormData();
    formDatas.append('name', data.name);
    formDatas.append('type', data.type);
    formDatas.append('img', data.img);

    api.productResourceApi.covers.Update(data.id, formDatas, () => {
      disapatch(fetchcovers());
      setData(coverData);
      setUpdate(false);
      setOpen(!open);
    });
  };

  // delete orientation
  const deleteFnc = (ids) => {
    // const id = toast.loading("Please wait...")
    api.productResourceApi.covers.Delete(ids, () => {
      disapatch(fetchcovers());
    });
  };

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <Card>
      <Stack
        spacing={2}
        className="my-3"
        sx={{ p: 2 }}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <b>Covers</b>
        <Button
          variant="contained"
          onClick={() => {
            setUpdate(false);
            setData(cover);
            setOpen(!open);
          }}
          color="primary"
        >
          Create Cover
        </Button>
      </Stack>
      {/* <Card> */}
      <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
        <Scrollbar>
          <Table stickyHeader aria-label="sticky table">
            <TableHeadCustom headLabel={TABLE_HEAD} />
            <TableBody>
              {cover ? (
                cover.map((row, key) => (
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
                            sx={{ borderRadius: 1.5, width: 48, height: 48, marginRight: 2.5 }}
                          />
                          {row.name}
                        </Stack>
                      </TableCell>

                      {/* <TableCell>{row.value}</TableCell> */}
                      <TableCell>{fDate(row.created_at)}</TableCell>

                      {/* <TableCell align="right">{fCurrency(price)}</TableCell> */}

                      <TableCell align="right">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <IconButton
                              color="primary"
                              onClick={() => {
                                setData(row);
                                setUpdate(!update);
                                setOpen(!open);
                                // handleClosePopover();
                              }}
                            >
                              <Iconify icon="eva:edit-fill" />
                            </IconButton>
                            <IconButton
                              color="error"
                              onClick={() => {
                                deleteFnc(row.id);
                                // handleClosePopover();
                              }}
                            >
                              <Iconify icon="eva:trash-2-outline" />
                            </IconButton>
                          </Stack>
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
                          
                          deleteFnc(row.id);
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
                ))
              ) : (
                <TableNoData isNotFound={1} />
              )}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>
      {/* </Card> */}
      {/* crete modal */}
      <Dialog
        open={open}
        onClose={() => {
          setUpdate(false);
          setOpen(!open);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle>Create New Cover</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ marginTop: 1 }}>
            <TextField
              fullWidth
              label="Cover Name"
              onChange={(e) => setData({ ...data, name: e.target.value })}
              value={data.name}
            />
            <FormControl fullWidth sx={{ textAlign: 'left' }}>
              <InputLabel
                id="demo-simple-select-helper-label"
                sx={{ backgroundColor: '#fff', paddingLeft: 1, paddingRight: 1 }}
              >
                Type
              </InputLabel>
              <Select
                name=""
                onChange={(e) => setData({ ...data, type: e.target.value })}
                id=""
                defaultValue={data.type}
                label="Type"
                sx={{ color: '#000' }}
              >
                <MenuItem value="img_option_colors">Single Image + Option + Colors</MenuItem>
                <MenuItem value="option_colors">Option + Colors</MenuItem>
                <MenuItem value="both_img">Both Side Image + No Option</MenuItem>
              </Select>
            </FormControl>
            <TextField
              type="file"
              fullWidth
              placeholder="Orientation Name"
              onChange={(e) => setData({ ...data, img: e.target.files[0] })}
            />
          </Stack>
          <DialogActions>
            {update ? (
              <div className="my-3">
                <Button variant="contained" fullWidth color="warning" onClick={updateOrientation}>
                  Update
                </Button>
              </div>
            ) : (
              <div className="my-3">
                <Button variant="contained" fullWidth color="primary" onClick={submit}>
                  Create
                </Button>
              </div>
            )}
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

export default Cover;

/*
<Select name="" onChange={(e) => setData({ ...data, type: e.target.value })} id="">
              <MenuItem value="img">Front & Back img</MenuItem>
              <MenuItem value="leather">Single Img + leather option</MenuItem>
              <MenuItem value="canvas">Only lether Option</MenuItem>
              <MenuItem value="acrylic">Febric Regular</MenuItem>
            </Select>
*/
