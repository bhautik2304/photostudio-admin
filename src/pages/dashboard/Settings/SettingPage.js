import { Card, Container, Grid, Paper } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs/CustomBreadcrumbs'
import { PATH_DASHBOARD } from '../../../routes/paths'

function SettingPage() {
    return (
        <Container>
            <div style={{ width: '90%', justifyContent: 'center' }} >
                <CustomBreadcrumbs
                    heading="All Settings"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Seting' },
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
    <Grid item xs={12} md={3}  >
        <Link to={link} style={{ textDecoration: 'none' }}>
            <Card sx={{ py: 3, px: 3, textAlign: 'center' }}>
                <h4>{title}</h4>
            </Card>
        </Link>
    </Grid>
)