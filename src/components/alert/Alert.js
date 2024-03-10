import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
// channels
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

import { fetchCustomer } from '../../redux/slices/customer';
import { fetchOrder } from '../../redux/slices/order';

const echo = new Echo({
    broadcaster: 'pusher',
    key: '81314e8a37e2b6f4535b',
    cluster: 'ap2',
    forceTLS: true
});

export default function TransitionAlerts() {
    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = React.useState("");

    const dispatch = useDispatch()

    useEffect(() => {
        echo.channel('newcostomerreqest')
            .listen('newcostomerrequist', (e) => {
                // Alert.success('Order Created')
                dispatch(fetchCustomer())
                setOpen(true)
                setMsg(e.message)
            })

        echo.channel('neworder')
            .listen('neworder', (e) => {
                setOpen(true)
                console.log(e.order);
                dispatch(fetchOrder())
                setMsg(e.order)
            })
    }, [dispatch])

    return (
        <Box sx={{ width: '100%', display: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Collapse in={open}>
                <center>
                    <Alert
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                X
                            </IconButton>
                        }
                        sx={{ mb: 2, width: '50%' }}
                    >
                        {msg}
                    </Alert>
                </center>
            </Collapse>
        </Box>
    );
}