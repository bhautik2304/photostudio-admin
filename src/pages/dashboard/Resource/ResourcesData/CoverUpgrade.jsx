/* eslint-disable no-plusplus */
import React, { Fragment, useState } from 'react';
import {
  Button,
  MenuItem,
  Autocomplete,
  DialogTitle,
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
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchcoversupgrades } from '../../../../redux/thunk';
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

const coverupgardeData = {
  name: '',
  cover_id: '',
  img: '',
  colors: [],
};

function CoverUpgrade() {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [coverType, setCoverType] = useState(false);
  const [coverUpgradeSelect, setCoverUpgradeSelect] = useState([]);
  const [data, setData] = useState(coverupgardeData);
  const dispatch = useDispatch();
  const { cover, coverupgrade, color } = useSelector((state) => state.resource);
  const [openPopover, setOpenPopover] = useState(null);

  const submit = () => {
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

    api.productResourceApi.coversupgrades.Create(formData, () => {
      setOpen(false);
      dispatch(fetchcoversupgrades());
      setData(coverupgardeData);
    });
  };

  const updateOrientation = () => {
    const formDatas = new FormData();
    formDatas.append('name', data.name);
    formDatas.append('img', data.img);

    api.productResourceApi.coversupgrades.Update(data.id, formDatas, () => {
      setOpen(false);
      dispatch(fetchcoversupgrades());
      setData(coverupgardeData);
      setUpdate(false);
    });
  };
  const deleteFnc = (ids) => {
    api.productResourceApi.coversupgrades.Delete(ids, () => {
      dispatch(fetchcoversupgrades());
    });
  };

  // const handleColorDelete = (index) => {
  //   const updatedColors = [...data.colors];
  //   updatedColors.splice(index, 1); // Remove the color at the specified index
  //   setData({ ...data, colors: updatedColors });
  // };

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
        <b>Covers Upgrade</b>
        <Button
          variant="contained"
          onClick={() => {
            setUpdate(false);
            setData(cover);
            setOpen(!open);
          }}
          color="primary"
        >
          Create Cover Upgrade
        </Button>
      </Stack>
      {/* <Card> */}
      <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
        <Scrollbar>
          <Table stickyHeader aria-label="sticky table">
            <TableHeadCustom headLabel={TABLE_HEAD} />
            <TableBody>
              {coverupgrade ? (
                coverupgrade.map((row, key) => {
                  console.log(row);
                  return (
                    <Fragment key={key}>
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
                    </Fragment>
                  );
                })
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
        <DialogTitle>Create New Cover Upgrade</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ marginTop: 1 }}>
            {!update && (
              <FormControl fullWidth sx={{ textAlign: 'left' }}>
                <InputLabel
                  id="demo-simple-select-helper-label"
                  sx={{ backgroundColor: '#fff', paddingLeft: 1, paddingRight: 1 }}
                >
                  Cover
                </InputLabel>
                <Select
                  name=""
                  onChange={(e) => setData({ ...data, cover_id: e.target.value })}
                  id=""
                  defaultValue={data.cover_id}
                  label="Cover"
                  sx={{ color: '#000' }}
                >
                  {cover
                    .filter((datas) => datas.type !== 'both_img')
                    .map((dats) => (
                      <MenuItem value={dats.id}>{dats.name}</MenuItem>
                    ))}
                </Select>
              </FormControl>
            )}
            <TextField
              fullWidth
              label="Cover Option Name"
              onChange={(e) => setData({ ...data, name: e.target.value })}
              value={data.name}
            />
            <TextField
              type="file"
              fullWidth
              placeholder="Orientation Name"
              onChange={(e) => setData({ ...data, img: e.target.files[0] })}
            />
            {!update && (
              <Autocomplete
                multiple
                fullWidth
                id="multiple-limit-tags"
                options={color.map((datas) => ({ title: datas.color, id: datas.id }))}
                getOptionLabel={(option) => option.title}
                onChange={(d, newValue) => {
                  setData((prevData) => ({
                    ...prevData,
                    colors: newValue.map((selectedColor) => selectedColor.id),
                  }));
                }}
                // defaultValue={[top100Films[13], top100Films[12], top100Films[11]]}
                renderInput={(params) => (
                  <TextField {...params} label="Select Color" fullWidth placeholder="Color" />
                )}
              />
            )}
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

export default CoverUpgrade;

function generateRandomId(length = 8) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomId = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomId += characters.charAt(randomIndex);
  }

  return randomId;
}
