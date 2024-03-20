import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import sumBy from 'lodash/sumBy';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// @mui
import { useTheme } from '@mui/material/styles';
import {
    Tab,
    Tabs,
    Card,
    Table,
    Stack,
    Button,
    Tooltip,
    Divider,
    TableBody,
    Container,
    IconButton,
    TableContainer,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// utils
// _mock_
import { _invoices } from '../../../_mock/arrays';
// components
import Label from '../../../components/label';
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import ConfirmDialog from '../../../components/confirm-dialog';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../components/settings';
import {
    useTable,
    getComparator,
    emptyRows,
    TableNoData,
    TableEmptyRows,
    TableHeadCustom,
    TableSelectedAction,
    TablePaginationCustom,
} from '../../../components/table';
// sections
import InvoiceAnalytic from './InvoiceAnalytic';
import InvoiceTableRow from './InvoiceTableRow';
import InvoiceTableToolbar from './InvoiceTableToolbar'
// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'invoiceNumber', label: 'Client', align: 'left' },
    { id: 'Date', label: 'Date', align: 'left' },
    { id: 'price', label: 'Amount', align: 'center', width: 140 },
    { id: 'Payment Status', label: 'Payment Status', align: 'center', width: 140 },
    { id: 'Order status', label: 'Order status', align: 'left' },
    { id: '' },
];

// ----------------------------------------------------------------------

export default function InvoiceListPage() {
    const theme = useTheme();

    const { themeStretch } = useSettingsContext();

    const navigate = useNavigate();

    const {
        dense,
        page,
        order,
        orderBy,
        rowsPerPage,
        setPage,
        //
        selected,
        setSelected,
        onSelectRow,
        onSelectAllRows,
        //
        onSort,
        onChangeDense,
        onChangePage,
        onChangeRowsPerPage,
    } = useTable({ defaultOrderBy: 'createDate' });

    const [tableData, setTableData] = useState(_invoices);

    const [filterName, setFilterName] = useState('');

    const [openConfirm, setOpenConfirm] = useState(false);

    const [filterStatus, setFilterStatus] = useState('all');

    const [filterEndDate, setFilterEndDate] = useState(null);

    const [filterService, setFilterService] = useState('all');

    const [filterStartDate, setFilterStartDate] = useState(null);

    const orders = useSelector(state => state.order.orders)

    useEffect(() => {
        setTableData(orders);
        console.log(orders);
    }, [orders]);

    const dataFiltered = applyFilter({
        inputData: tableData,
        comparator: getComparator(order, orderBy),
        filterName,
        filterService,
        filterStatus,
        filterStartDate,
        filterEndDate,
    });

    const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const denseHeight = dense ? 56 : 76;

    const isFiltered =
        filterStatus !== 'all' ||
        filterName !== '' ||
        filterService !== 'all' ||
        (!!filterStartDate && !!filterEndDate);

    const isNotFound =
        (!dataFiltered.length && !!filterName) ||
        (!dataFiltered.length && !!filterStatus) ||
        (!dataFiltered.length && !!filterService) ||
        (!dataFiltered.length && !!filterEndDate) ||
        (!dataFiltered.length && !!filterStartDate);

    const getLengthByStatus = (status) => tableData.filter((item) => item.order_status === status).length;
    // eslint-disable-next-line eqeqeq
    const getSampleOrder = () => tableData.filter((item) => item.is_sample == 1).length;
    const getPercentByStatus = (status) => (getLengthByStatus(status) / tableData.length) * 100;

    const TABS = [
        { value: 'All Orders', label: 'All Orders', color: 'info', count: tableData.length },
        { value: 'Completed Orders', label: 'Completed Orders', color: 'success', count: getLengthByStatus('completed') },
        { value: 'Pending Orders', label: 'Pending Orders', color: 'warning', count: getLengthByStatus('pending') },
        { value: 'Processing Orders', label: 'Processing Orders', color: 'default', count: getLengthByStatus('processing') },
        { value: 'Cancel Orders', label: 'Cancel Orders', color: 'error', count: getLengthByStatus('cancel') },
        { value: 'dispatch Orders', label: 'dispatch Orders', color: 'info', count: getLengthByStatus('dispatch') },
        { value: 'Sampel Orders', label: 'Sampel Orders', color: 'info', count: getSampleOrder('dispatch') },
    ];

    const handleOpenConfirm = () => {
        setOpenConfirm(true);
    };

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };

    const handleFilterStatus = (event, newValue) => {
        setPage(0);
        setFilterStatus(newValue);
    };

    const searchOrders = (searchParam) => {
        const results = tableData.filter((data) => {
            const customer = data.costomer; // Fix typo in the key name "costomer" to "customer"
            const orderNo = data.order_no.toString();

            return (
                customer.name.toLowerCase().includes(searchParam.toLowerCase()) ||
                customer.phone_no.toString().includes(searchParam) ||
                customer.email.toString().includes(searchParam) ||
                orderNo.includes(searchParam)
            );
        });

        if (searchParam === "") {
            handleResetFilter()
        } else {
            setTableData(results);
        }
    };

    const handleDeleteRow = (id) => {
        const deleteRow = tableData.filter((row) => row.id !== id);
        setSelected([]);
        setTableData(deleteRow);

        if (page > 0) {
            if (dataInPage.length < 2) {
                setPage(page - 1);
            }
        }
    };

    const handleDeleteRows = (selectedRows) => {
        const deleteRows = tableData.filter((row) => !selectedRows.includes(row.id));
        setSelected([]);
        setTableData(deleteRows);

        if (page > 0) {
            if (selectedRows.length === dataInPage.length) {
                setPage(page - 1);
            } else if (selectedRows.length === dataFiltered.length) {
                setPage(0);
            } else if (selectedRows.length > dataInPage.length) {
                const newPage = Math.ceil((tableData.length - selectedRows.length) / rowsPerPage) - 1;
                setPage(newPage);
            }
        }
    };

    const handleEditRow = (id) => {
        navigate(PATH_DASHBOARD.orders.OrdersDetaild(id));
    };

    const handleViewRow = (id) => {
        navigate(PATH_DASHBOARD.orders.detail + id);
    };

    const handleResetFilter = () => {
        setFilterName('');
        setFilterStatus('All Orders');
        setFilterService('all');
        setFilterEndDate(null);
        setFilterStartDate(null);
        setTableData(orders);
    };

    return (
        <>
            <Helmet>
                <title> Orders: List | Photokrafft.com</title>
            </Helmet>

            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Orders List"
                    links={[
                        {
                            name: 'Dashboard',
                            href: PATH_DASHBOARD.root,
                        },
                        {
                            name: 'Orders List',
                        },
                    ]}
                />

                <Card sx={{ mb: 5 }}>
                    <Scrollbar>
                        <Stack
                            direction="row"
                            divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
                            sx={{ py: 2 }}
                        >
                            <InvoiceAnalytic
                                title="Total Orders"
                                total={tableData.length}
                                percent={100}
                                icon="ic:round-receipt"
                                color={theme.palette.info.main}
                            />

                            <InvoiceAnalytic
                                title="Completed Orders"
                                total={getLengthByStatus('completed')}
                                percent={getPercentByStatus('paid')}
                                icon="eva:checkmark-circle-2-fill"
                                color={theme.palette.success.main}
                            />

                            <InvoiceAnalytic
                                title="Pending Orders"
                                total={getLengthByStatus('pending')}
                                percent={getPercentByStatus('unpaid')}
                                icon="eva:clock-fill"
                                color={theme.palette.warning.main}
                            />

                            <InvoiceAnalytic
                                title="Sample Orders"
                                total={getSampleOrder('pending')}
                                percent={getPercentByStatus('unpaid')}
                                icon="eva:clock-fill"
                                color={theme.palette.info.main}
                            />
                            
                        </Stack>
                    </Scrollbar>
                </Card>

                <Card>
                    <Tabs
                        value={filterStatus}
                        onChange={handleFilterStatus}
                        sx={{
                            px: 2,
                            bgcolor: 'background.neutral',
                        }}
                    >
                        {TABS.map((tab) => (
                            <Tab
                                key={tab.value}
                                value={tab.value}
                                label={tab.label}
                                icon={
                                    <Label color={tab.color} sx={{ mr: 1 }}>
                                        {tab.count}
                                    </Label>
                                }
                            />
                        ))}
                    </Tabs>

                    <Divider />

                    <InvoiceTableToolbar
                        isFiltered={isFiltered}
                        filterSearch={searchOrders}
                        onResetFilter={handleResetFilter}
                    />

                    <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
                        <TableSelectedAction
                            dense={dense}
                            numSelected={selected.length}
                            rowCount={tableData.length}
                            onSelectAllRows={(checked) =>
                                onSelectAllRows(
                                    checked,
                                    tableData.map((row) => row.id)
                                )
                            }
                            action={
                                <Stack direction="row">
                                    <Tooltip title="Sent">
                                        <IconButton color="primary">
                                            <Iconify icon="ic:round-send" />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Download">
                                        <IconButton color="primary">
                                            <Iconify icon="eva:download-outline" />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Print">
                                        <IconButton color="primary">
                                            <Iconify icon="eva:printer-fill" />
                                        </IconButton>
                                    </Tooltip>
                                </Stack>
                            }
                        />

                        <Scrollbar>
                            <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                                <TableHeadCustom
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={tableData.length}
                                    numSelected={selected.length}
                                    onSort={onSort}
                                    onSelectAllRows={(checked) =>
                                        onSelectAllRows(
                                            checked,
                                            tableData.map((row) => row.id)
                                        )
                                    }
                                />

                                <TableBody>
                                    {dataFiltered
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => (
                                            <InvoiceTableRow
                                                key={row.id}
                                                row={row}
                                                selected={selected.includes(row.id)}
                                                onSelectRow={() => onSelectRow(row.id)}
                                                onViewRow={() => handleViewRow(row.id)}
                                                onEditRow={() => handleEditRow(row.id)}
                                                onDeleteRow={() => handleDeleteRow(row.id)}
                                            />
                                        ))}

                                    <TableEmptyRows
                                        height={denseHeight}
                                        emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                                    />

                                    <TableNoData isNotFound={isNotFound} />
                                </TableBody>
                            </Table>
                        </Scrollbar>
                    </TableContainer>

                    <TablePaginationCustom
                        count={dataFiltered.length}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        onPageChange={onChangePage}
                        onRowsPerPageChange={onChangeRowsPerPage}
                        //
                        dense={dense}
                        onChangeDense={onChangeDense}
                    />
                </Card>
            </Container>

            <ConfirmDialog
                open={openConfirm}
                onClose={handleCloseConfirm}
                title="Delete"
                content={
                    <>
                        Are you sure want to delete <strong> {selected.length} </strong> items?
                    </>
                }
                action={
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                            handleDeleteRows(selected);
                            handleCloseConfirm();
                        }}
                    >
                        Delete
                    </Button>
                }
            />
        </>
    );
}

// ----------------------------------------------------------------------

function applyFilter({
    inputData,
    filterName,
    filterStatus
}) {
    
    console.log(filterStatus);
    console.log(inputData);
    if (filterStatus === "Completed Orders") {
        inputData = inputData.filter((invoice) => invoice.order_status === "completed");
        return inputData
    }
    if (filterStatus === "Pending Orders") {
        inputData = inputData.filter((invoice) => invoice.order_status === "pending");
        return inputData;
    }
    if (filterStatus === "Sampel Orders") {
        inputData = inputData.filter((invoice) => invoice.is_sample === 1);
        return inputData;
    }
    if (filterStatus === "Processing Orders") {
        inputData = inputData.filter((invoice) => invoice.order_status === "processing");
        return inputData;
    }
    if (filterStatus === "Cancel Orders") {
        inputData = inputData.filter((invoice) => invoice.order_status === "cancel");
        return inputData;
    }
    if (filterStatus === "dispatch Orders") {
        inputData = inputData.filter((invoice) => invoice.order_status === "dispatch");
        console.log(inputData);
        return inputData;
    }

    return inputData;

}
