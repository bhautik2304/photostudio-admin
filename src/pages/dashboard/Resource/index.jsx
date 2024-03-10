import React, { useState } from 'react'
import { Tabs, Tab, Typography, Box, Paper, Container, Card } from '@mui/material'
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';
import Orientation from './ResourcesData/Orientation'
import { BoxSleeve, Colors, Cover, CoverUpgrade, PaperType, Sheet, Size } from './ResourcesData';
import BoxSleeveUpgrade from './ResourcesData/BoxSleeveUpgrade';

function Index() {

  const [value, setValue] = useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  return (
      <Container>
        <CustomBreadcrumbs
          heading="Product Resource"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.dashbord },
            { name: 'Resource' },
          ]}
        />
        <Paper sx={{ width: '100%' }} >
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Card>
              <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="scrollable auto tabs example" sx={{ px: 2, bgcolor: 'background.neutral',}}>
                <Tab label="Orientation" {...a11yProps(0)} />
                <Tab label="Size" {...a11yProps(1)} />
                <Tab label="Paper Type" {...a11yProps(2)} /> 
                <Tab label="Sheet" {...a11yProps(3)} />
                <Tab label="colors" {...a11yProps(4)} />
                <Tab label="Covers" {...a11yProps(5)} />
                <Tab label="Cover Upgrade" {...a11yProps(6)} />
                <Tab label="Box & Sleeve" {...a11yProps(7)} />
                <Tab label="Box & Sleeve Upgrade" {...a11yProps(8)} />
                {/* <Tab label="Paper Type" {...a11yProps(3)} /> */}
              </Tabs>
            </Card>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Orientation />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Size />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <PaperType />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <Sheet />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={4}>
            <Colors />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={5}>
            <Cover />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={6}>
            <CoverUpgrade />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={7}> 
          <BoxSleeve />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={8}>
            <BoxSleeveUpgrade />
          </CustomTabPanel>
        </Paper>
      </Container>
  )
}

export default Index


function CustomTabPanel(props) {
  // eslint-disable-next-line react/prop-types
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}` }
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}