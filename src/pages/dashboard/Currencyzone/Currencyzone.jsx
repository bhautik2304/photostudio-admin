import React, { useState } from 'react'
import { Button, MenuItem, DialogTitle, Dialog, DialogActions, DialogContent, Stack, TextField, Table, TableBody, TableCell, TableContainer, TableRow, IconButton, Checkbox, Card, Select, Container } from '@mui/material'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import { useDispatch, useSelector } from 'react-redux'

import { fetchcountryzone } from '../../../redux/thunk'
import { apiRoutes } from '../../../constants'
import {
    TableNoData,
    TableHeadCustom,
} from '../../../components/table';
import Scrollbar from '../../../components/scrollbar';
import Iconify from '../../../components/iconify';
import Image from '../../../components/image';
import MenuPopover from '../../../components/menu-popover';
import { fDate } from '../../../utils/formatTime';
import { api } from '../../../Api/api'

const TABLE_HEAD = [
    { id: '' },
    // { id: '' },
];
const countryzoneData = {
    zonename: '',
    shipingcharge: '',
    currency_sign: '',
    img: '',
}
function Currencyzone() {
    const [open, setOpen] = useState(false)
    const [update, setUpdate] = useState(false)
    const [data, setData] = useState(countryzoneData)
    const [openPopover, setOpenPopover] = useState(null);
    const disapatch = useDispatch()
    const { countryzone } = useSelector(state => state.resource)

    // create orientation 

    const submit = () => {
        // const id = toast.loading("Please wait...")
        const formData = new FormData()
        formData.append('name', data.zonename)
        formData.append('shipingcharge', data.shipingcharge)
        formData.append('currency_sign', data.currency_sign)
        formData.append('img', data.img)
        api.countryzoneApi.Create(formData).then(res => {

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
                disapatch(fetchcountryzone())
                setData(countryzoneData)
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
        formDatas.append('zonename', data.zonename)
        formDatas.append('shipingcharge', data.shipingcharge)
        formDatas.append('currency_sign', data.currency_sign)
        formDatas.append('img', data.img)

        api.countryzoneApi.Update(data.id, formDatas).then(res => {
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
                disapatch(fetchcountryzone())
                setData(countryzoneData)
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
        axios.delete(apiRoutes.boxsleeveReq + ids).then(res => {
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
                disapatch(fetchcountryzone())
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
        <Container>
            <Stack spacing={2} className='my-3' sx={{ p: 2 }} direction='row' alignItems='end' justifyContent='end'  >
                <Button variant="contained" onClick={() => {
                    setUpdate(false)
                    setData(countryzoneData)
                    setOpen(!open)
                }} color="primary">Create New Box & Sleeve</Button>
            </Stack>
            <Card>
                <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
                    <Scrollbar>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHeadCustom headLabel={TABLE_HEAD} />
                            <TableBody>

                                {countryzone ? countryzone.map((row, key) =>
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
                                                        alt={row.zonename}
                                                        src={row.img}
                                                        sx={{ borderRadius: 1.5, width: 48, height: 48, marginRight: 2.5 }}
                                                    />
                                                    {row.zonename}
                                                </Stack>
                                            </TableCell>

                                            <TableCell>{row.currency_sign}</TableCell>
                                            <TableCell>{row.shipingcharge}</TableCell>
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
            </Card>
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
                    <h4>Create New Currency Zone</h4>
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={2}>
                        <TextField fullWidth placeholder='Currency Zone Name' label='Currency Zone' onChange={(e) => setData({ ...data, zonename: e.target.value })} value={data.zonename} />
                        <Select onChange={(e) => setData({ ...data, currency_sign: e.target.value })} value={data.currency_sign} label='Currency Sign' placeholder='Select Currency Sign' >
                            <MenuItem value='$' >$ USD</MenuItem>
                            <MenuItem value='₹' >₹ INR</MenuItem>
                        </Select>
                        <TextField fullWidth placeholder='Currency Zone Shiping charge' label='Currency Zone Shiping charge' onChange={(e) => setData({ ...data, shipingcharge: e.target.value })} value={data.shipingcharge} />
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
        </Container>
    )
}

export default Currencyzone