import PropTypes from 'prop-types';
// @mui
import {
  Box,
  Card,
  Table,
  Stack,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  CardHeader,
  Typography,
  TableContainer,
  Button,
} from '@mui/material';
// utils
import { useNavigate, useRoutes } from 'react-router';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/label';
import Image from '../../../../components/image';
import Scrollbar from '../../../../components/scrollbar';
import { TableHeadCustom } from '../../../../components/table';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { apiRoutes } from '../../../../constants';
import { fetchCustomer } from '../../../../redux/slices/customer';
// ----------------------------------------------------------------------

EcommerceBestSalesman.propTypes = {
  title: PropTypes.string,
  tableData: PropTypes.array,
  subheader: PropTypes.string,
  tableLabels: PropTypes.array,
};

export default function EcommerceBestSalesman({
  title,
  subheader,
  tableData,
  tableLabels,
  ...other
}) {
  console.log(tableData);
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

      <TableContainer sx={{ overflow: 'unset' }}>
        <Scrollbar>
          <Table sx={{ minWidth: 720 }}>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {tableData.map((row) => (
                <EcommerceBestSalesmanRow key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>
    </Card>
  );
}

// ----------------------------------------------------------------------

EcommerceBestSalesmanRow.propTypes = {
  row: PropTypes.shape({
    flag: PropTypes.string,
    name: PropTypes.string,
    compunys_name: PropTypes.string,
    email: PropTypes.string,
    country: PropTypes.number,
    avatar: PropTypes.string,
    phone_no: PropTypes.string,
    id: PropTypes.number,
  }),
};

function EcommerceBestSalesmanRow({ row }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const showProfile = (id) => {
    navigate(PATH_DASHBOARD.customer.customerProfile(id))
  }

  const approvedCustomer = (id) => {
    axios.post(`${apiRoutes.costomer}approve/${id}`).then(() => {
      dispatch(fetchCustomer())
    })
  }

  return (
    <TableRow>
      <TableCell>
        <Stack direction="row" alignItems="center">
          <Avatar alt={row.name} src={row?.avatar} />

          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle2"> {row.name} </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {row.email}
            </Typography>
          </Box>
        </Stack>
      </TableCell>
      <TableCell>{row.phone_no}</TableCell>
      <TableCell>{row.country}</TableCell>
      <TableCell>{row?.compunys_name}</TableCell>
      <TableCell>
        <Stack direction="row" spacing={1.5}>
          <Button color='warning' variant="contained" onClick={() => {
            showProfile(row.id)
          }} >View</Button>
          {/* <Button variant="contained" onClick={() => {
            approvedCustomer(row.id)
          }} >Approve</Button> */}
        </Stack>
      </TableCell>
    </TableRow>
  );
}
