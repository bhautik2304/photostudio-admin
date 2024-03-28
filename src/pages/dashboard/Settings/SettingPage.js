import { Card, Container, Grid, Paper, Box, Typography, Stack, FormControlLabel, Switch } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CancelIcon from '@mui/icons-material/Cancel';
import GroupIcon from '@mui/icons-material/Group';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LogoutIcon from '@mui/icons-material/Logout';
import { EcommerceWidgetSummary } from "../../../sections/@dashboard/general/e-commerce";
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs/CustomBreadcrumbs'
import { PATH_DASHBOARD } from '../../../routes/paths'

function SettingPage() {
    return (
        <Container>
            <div style={{ justifyContent: 'center' }} >
                <CustomBreadcrumbs
                    heading="All Settings"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Setting' },
                    ]}
                />
                <Grid container direction='row' >
                    <SettingLinkCard title='Admin User' link={PATH_DASHBOARD.setting.userModule.adminuserList} />
                </Grid>
            </div>
        </Container>
    )
}

export default SettingPage

// Compare this snippet from src/pages/dashboard/SettingPage.js:

// eslint-disable-next-line react/prop-types
const SettingLinkCard = ({ title, link }) => (
    // <Grid item xs={12} md={3}  >
    //     <Link to={link} style={{ textDecoration: 'none' }}>
    //         <Card sx={{ py: 3, px: 3, textAlign: 'center' }}>
    //             <h4>{title}</h4>
    //         </Card>
    //     </Link>
    // </Grid>
    <Container >
        <Grid container spacing={3}>
            <Grid item xs={12} md={3} sx={{ position: 'relative', overflow: 'hidden' }}>
                <Link to={link} style={{ textDecoration: 'none' }}>
                    <Card sx={{ display: 'flex', alignItems: 'center', p: 3, background: "#13029591", color: "#fff" }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h3" paragraph sx={{ fontSize: '1.5rem!important', fontWeight: '600', marginBottom: '.25em' }}>
                                Admin
                            </Typography>

                            <Typography variant="subtitle2" paragraph sx={{ fontWeight: '300' }}>
                                Admin Profile Setting
                            </Typography>
                        </Box>
                    </Card>
                    <GroupIcon
                        sx={{
                            position: 'absolute',
                            right: "-0.15em",
                            color: "#ffffff36",
                            fontSize: "8em",
                            bottom: "-0.2em",
                        }}
                    />
                </Link>
            </Grid>
            <Grid item xs={12} md={3} sx={{ position: 'relative', overflow: 'hidden' }}>
                {/* <EcommerceWidgetSummary
                    title="Total Orders"
                    total={123}
                    sx={{
                        background: "#ff00007a",
                        color: "#fff"
                    }}
                /> */}
                <Link to='#' style={{ textDecoration: 'none' }}>
                    <Card sx={{ display: 'flex', alignItems: 'center', p: 3, background: "#26c6da", color: "#fff" }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h3" paragraph sx={{ fontSize: '1.5rem!important', fontWeight: '600', marginBottom: '.25em' }}>
                                Admin user
                            </Typography>
                            <Typography variant="subtitle2" paragraph sx={{ fontWeight: '300' }}>
                                Add management user
                            </Typography>
                        </Box>
                    </Card>
                    <PersonAddIcon
                        sx={{
                            position: 'absolute',
                            right: "-0.15em",
                            color: "#ffffff36",
                            fontSize: "8em",
                            bottom: "-0.2em",
                        }}
                    />
                </Link>
            </Grid>
            <Grid item xs={12} md={3} sx={{ position: 'relative', overflow: 'hidden' }}>
                {/* <EcommerceWidgetSummary
                    title="Total Approved Customers"
                    total={12}
                    sx={{
                        background: "#9b00ff4f",
                        color: "#fff"
                    }}
                /> */}
                <Link to='#' style={{ textDecoration: 'none' }}>
                    <Card sx={{ display: 'flex', alignItems: 'center', p: 3, background: "#ef5350", color: "#fff" }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h3" paragraph sx={{ fontSize: '1.5rem!important', fontWeight: '600', marginBottom: '.25em' }}>
                                Logout
                            </Typography>
                            <Typography variant="subtitle2" paragraph sx={{ fontWeight: '300' }}>
                                Logout from the system
                            </Typography>
                        </Box>
                    </Card>
                    <LogoutIcon
                        sx={{
                            position: 'absolute',
                            // right: "-0.15em",
                            right: "0",
                            color: "#ffffff36",
                            fontSize: "5em",
                            bottom: "0em",
                        }}
                    />
                </Link>
            </Grid>
            <Grid item xs={12} md={3} sx={{ position: 'relative', overflow: 'hidden' }}>
                {/* <EcommerceWidgetSummary
                    title="New Customer Request"
                    total={333}
                    sx={{
                        background: "#ff360066",
                        color: "#fff"
                    }}
                /> */}
                <Link to='#' style={{ textDecoration: 'none' }}>
                    <Card sx={{ display: 'flex', alignItems: 'center', p: 3, background: "#66bb6a", color: "#fff" }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h3" paragraph sx={{ fontSize: '1.5rem!important', fontWeight: '600', marginBottom: '.25em' }}>
                                Cache
                            </Typography>
                            <Typography variant="subtitle2" paragraph sx={{ fontWeight: '300' }}>
                                Flush frontend user cache
                            </Typography>
                        </Box>
                    </Card>
                    <DeleteForeverIcon
                        sx={{
                            position: 'absolute',
                            right: "-0.15em",
                            color: "#ffffff36",
                            fontSize: "8em",
                            bottom: "-0.2em",
                        }}
                    />
                </Link>
            </Grid>
            <Grid item xs={12} md={3} sx={{ position: 'relative', overflow: 'hidden', marginBottom: '2em'  }}>
                {/* <EcommerceWidgetSummary
                    title="New Customer Request"
                    total={333}
                    sx={{
                        background: "#ff360066",
                        color: "#fff"
                    }}
                /> */}
                <Link to='#' style={{ textDecoration: 'none' }}>
                    <Card sx={{ display: 'flex', alignItems: 'center', p: 3, background: "#007bff", color: "#fff" }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h3" paragraph sx={{ fontSize: '1.5rem!important', fontWeight: '600', marginBottom: '.25em' }}>
                                Laravel
                            </Typography>
                            <Typography variant="subtitle2" paragraph sx={{ fontWeight: '300' }}>
                                Clear laravel config
                            </Typography>
                        </Box>
                    </Card>
                    <CancelIcon
                        sx={{
                            position: 'absolute',
                            right: "-0.15em",
                            color: "#ffffff36",
                            fontSize: "8em",
                            bottom: "-0.2em",
                        }}
                    />
                </Link>
            </Grid>
            <Grid item xs={12} md={12} sx={{ position: 'relative', overflow: 'hidden' }}>
                <Card sx={{ display: 'flex', alignItems: 'center', p: 3, marginBottom: '2em' }}>
                    <Box sx={{ flexGrow: 1 }}>
                        {/* <Typography variant="h3" paragraph sx={{ fontSize: '1.25rem!important', fontWeight: '500', marginBottom: '.25em' }}>
                            Disable ordering
                        </Typography> */}
                        <FormControlLabel
                            labelPlacement="start"
                            control={
                                <Switch />
                            }
                            label={
                                <>
                                    {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}> */}
                                    <Typography variant="h3" paragraph sx={{ fontSize: '1.25rem!important', fontWeight: '500', marginBottom: '0' }}>
                                        Disable Ordering
                                    </Typography>
                                </>
                            }
                            sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between', textAlign: 'left', marginBottom: '0' }}
                        />
                    </Box>
                </Card>
                <Card sx={{ display: 'flex', alignItems: 'center', p: 3, marginBottom: '2em' }}>
                    <Box sx={{ flexGrow: 1 }}>
                        {/* <Typography variant="h3" paragraph sx={{ fontSize: '1.25rem!important', fontWeight: '500', marginBottom: '.25em' }}>
                            Disable ordering
                        </Typography> */}
                        <FormControlLabel
                            labelPlacement="start"
                            control={
                                <Switch />
                            }
                            label={
                                <>
                                    {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}> */}
                                    <Typography variant="h3" paragraph sx={{ fontSize: '1.25rem!important', fontWeight: '500', marginBottom: '0' }}>
                                        Block All Admin Users
                                    </Typography>
                                </>
                            }
                            sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between', textAlign: 'left', marginBottom: '0' }}
                        />
                    </Box>
                </Card>
            </Grid>
        </Grid>
    </Container>
)