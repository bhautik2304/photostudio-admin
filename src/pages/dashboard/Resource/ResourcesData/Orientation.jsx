import React, { useState } from 'react';
import {
  Button,
  MenuItem,
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
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchOrientation } from '../../../../redux/thunk';
import { apiRoutes } from '../../../../constants';
import { TableNoData, TableHeadCustom } from '../../../../components/table';
import Scrollbar from '../../../../components/scrollbar';
import Iconify from '../../../../components/iconify';
import Image from '../../../../components/image';
import MenuPopover from '../../../../components/menu-popover';
import { fDate } from '../../../../utils/formatTime';
import { api } from '../../../../Api/api';

const OrientationData = {
  name: '',
  img: '',
};

const TABLE_HEAD = [
  { id: '#', label: '#', align: 'left' },
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'created_at', label: 'Created at', align: 'left' },
  { id: '', label: '', align: 'left' },
];

function Orientation() {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [data, setData] = useState(OrientationData);
  const [openPopover, setOpenPopover] = useState(null);

  const disapatch = useDispatch();
  const { orientation } = useSelector((state) => state.resource);

  // create orientation

  const submit = () => {
   
    console.log(data);

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('img', data.img);
    api.productResourceApi.orientation.Create(formData, () => {
      // setOpen(!open)
      disapatch(fetchOrientation());
      setData(OrientationData);
      setOpen(!open);
    });
  };

  // update orientation

  const updateOrientation = () => {
    console.log(data);

   
    const formDatas = new FormData();
    formDatas.append('name', data.name);
    formDatas.append('img', data.img);

    api.productResourceApi.orientation.Update(data.id, formDatas, () => {
      disapatch(fetchOrientation());
      setData(OrientationData);
      setUpdate(false);
      setOpen(!open);
    });
  };

  // delete orientation
  const deleteFnc = (ids) => {
    api.productResourceApi.orientation.Delete(ids, () => {
      disapatch(fetchOrientation());
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
      {/* <Divider /> */}
      {/* <Stack spacing={2} className='my-3' sx={{ p: 2 }} direction='row' alignItems='end' justifyContent='end'  > */}
      <Stack
        spacing={2}
        className="my-3"
        sx={{ p: 2 }}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <b>Orientation</b>
        <Button
          variant="contained"
          onClick={() => {
            setUpdate(false);
            setData(OrientationData);
            setOpen(!open);
          }}
          color="primary"
        >
          Create Orientations
        </Button>
      </Stack>
      {/* <Card> */}
      <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
        <Scrollbar>
          <Table stickyHeader aria-label="sticky table">
            <TableHeadCustom
              order={orientation}
              // orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={orientation.length}
              // numSelected={selected.length}
              // onSort={onSort}
              // onSelectAllRows={(checked) =>
              //   onSelectAllRows(
              //     checked,
              //     tableData.map((row) => row.id)
              //   )
              // }
            />
            <TableBody>
              {orientation ? (
                orientation.map((row, key) => (
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
                          <Typography sx={{ marginY: 5 }}>{row.name}</Typography>
                        </Stack>
                      </TableCell>

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
        <DialogTitle>Create a new Orientation</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ marginTop: 1 }}>
            <TextField
              fullWidth
              label="Orientation Name"
              onChange={(e) => setData({ ...data, name: e.target.value })}
              value={data.name}
            />
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
                {/* <Button variant="contained" fullWidth color="warning" onClick={updateOrientation} >Update</Button> */}
                <Button variant="contained" fullWidth color="primary" onClick={updateOrientation}>
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

export default Orientation;
