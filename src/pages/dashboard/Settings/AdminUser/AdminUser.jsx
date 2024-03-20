/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { toast } from 'react-toastify';
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
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { TableNoData, TableHeadCustom } from '../../../../components/table';
import Scrollbar from '../../../../components/scrollbar';
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';
import { fDate } from '../../../../utils/formatTime';
import { api } from '../../../../Api/api';
import { fetchAdminUsers } from '../../../../redux/slices/user';

const TABLE_HEAD = [
  { id: 'invoiceNumber', label: '#', align: 'left' },
  { id: 'invoiceNumber', label: 'Name', align: 'left' },
  { id: 'invoiceNumber', label: 'Mobile No.', align: 'left' },
  { id: 'invoiceNumber', label: 'Email Id', align: 'left' },
  { id: 'invoiceNumber', label: 'Created At', align: 'left' },
  { id: 'invoiceNumber', label: 'Action', align: 'right' },
];
const countryzoneData = {
  name: '',
  phone_no: '',
  email: '',
  password: '',
  img: '',
  role: '',
};
function AdminUser() {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [data, setData] = useState(countryzoneData);
  const [openPopover, setOpenPopover] = useState(null);
  const disapatch = useDispatch();
  const [error,setError]=useState({
    email:false,
    mobile:false,
  })
  const { users } = useSelector((state) => state.user);

  // create orientation


  const onSuccess = () => {
    setData(countryzoneData);
    disapatch(fetchAdminUsers())
    setOpen(!open);
  };
  const oneRROR = () => {
    setData(countryzoneData);
    setOpen(!open);
  };
  const submit = () => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('phone_no', data.phone_no);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('img', data.img);
    formData.append('role', data.role);

    api.userModule.create(formData, onSuccess, oneRROR);
  };

  // update orientation

  const updateOrientation = () => {
    console.log(data);
    const formDatas = new FormData();
    formDatas.append('name', data.name);
    formDatas.append('phone_no', data.phone_no);
    formDatas.append('email', data.email);
    formDatas.append('password', data.password);
    formDatas.append('img', data.img);
    formDatas.append('role', data.role);

    api.userModule.update(
      data.id,
      formDatas,
      () => {
        setUpdate(false);
        setOpen(!open);
        disapatch(fetchAdminUsers())
        setData(countryzoneData) 
      },
      () => {
        setUpdate(false);
        setOpen(!open); 
        setData(countryzoneData) 
      }
    );
  };

  // delete orientation

  const deleteFnc = (ids) => {
    const id = toast.loading('Please wait...');
    api.userModule
      .delete(ids)
      .then((res) => {
        console.log(res.data);
        // error logic
        if (!res.status === 200) {
          toast.update(id, { render: 'some thing went wrong', type: 'error', isLoading: false });
          setTimeout(() => {
            toast.dismiss(id);
          }, 5000);
          return;
        }

        // success logic
        if (res.data.success) {
          toast.update(id, { render: res.data.message, type: 'success', isLoading: false });
          disapatch(fetchAdminUsers());
          setTimeout(() => {
            toast.dismiss(id);
          }, 5000);
          return;
        }

        // api error logic
        toast.update(id, { render: res.data.message, type: 'error', isLoading: false });
        setTimeout(() => {
          toast.dismiss(id);
        }, 5000);
      })
      .catch((err) => {
        console.log(err);
        toast.update(id, { render: 'some thing went wrong', type: 'error', isLoading: false });
        setTimeout(() => {
          toast.dismiss(id);
        }, 5000);
      });
  };

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <>
      <Stack
        spacing={2}
        className="my-3"
        sx={{ p: 2 }}
        direction="row"
        alignItems="end"
        justifyContent="end"
      >
        <Button
          variant="contained"
          onClick={() => {
            setUpdate(false);
            setData(countryzoneData);
            setOpen(!open);
          }}
          color="primary"
        >
          Create New Box & Sleeve
        </Button>
      </Stack>
      <Card>
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <Scrollbar>
            <Table stickyHeader aria-label="sticky table">
              <TableHeadCustom headLabel={TABLE_HEAD} />
              <TableBody>
                {users ? (
                  users.map((row, key) => (
                    <>
                      <TableRow hover>
                        <TableCell padding="checkbox">
                          <Checkbox />
                        </TableCell>

                        <TableCell>
                          <Stack direction="row" alignItems="center" spacing={2}>
                            {row.name}
                          </Stack>
                        </TableCell>

                        <TableCell>{row.phone_no}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{fDate(row.created_at)}</TableCell>

                        {/* <TableCell align="right">{fCurrency(price)}</TableCell> */}

                        <TableCell align="right">
                          <IconButton
                            color={openPopover ? 'primary' : 'default'}
                            onClick={handleOpenPopover}
                          >
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
                            setData({ ...row, password: '' });
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
      </Card>
      {/* crete modal */}
      <Dialog
        open={open}
        onClose={() => {
          // setUpdate(false)
          setOpen(!open);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle>Create New User</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="User Name"
              onChange={(e) => setData({ ...data, name: e.target.value })}
              value={data.name}
            />
            <TextField
              fullWidth
              label="User Mobile"
              error={error.mobile}
              onChange={(e) => setData({ ...data, phone_no: e.target.value })}
              value={data.phone_no}
            />
            <TextField
              fullWidth
              label="User Email"
              error={error.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              value={data.email}
            />
            {!update && (
              <TextField
                fullWidth
                label="User Password"
                onChange={(e) => setData({ ...data, password: e.target.value })}
                value={data.password}
              />
            )}

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">User Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={data.role}
                defaultValue={data.role}
                label="Age"
                onChange={(e) => setData({ ...data, role: e.target.value })}
              >
                <MenuItem value="masteradmin">Master Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
                {/* <MenuItem value={30}>Thirty</MenuItem> */}
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
    </>
  );
}

export default AdminUser;
