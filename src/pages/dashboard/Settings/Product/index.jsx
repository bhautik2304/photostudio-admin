import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { useState, useEffect } from 'react';
import { LoadingButton } from '@mui/lab';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
    Card,
    Table,
    Button,
    Tooltip,
    TableBody,
    Container,
    IconButton,
    TableContainer,
    TextField,
    Grid,
} from '@mui/material';
import { 
    useTable,
    getComparator,
    emptyRows,
    TableNoData,
    TableSkeleton,
    TableEmptyRows,
    TableHeadCustom,
    TableSelectedAction,
    TablePaginationCustom,
} from '../../../../components/table';
import Iconify from '../../../../components/iconify';
import Scrollbar from '../../../../components/scrollbar';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import ConfirmDialog from '../../../../components/confirm-dialog';
import { ProductTableRow, ProductTableToolbar } from './list';
import { useDispatch, useSelector } from '../../../../redux/store';
import { getProducts } from '../../../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import { useSettingsContext } from '../../../../components/settings';

const TABLE_HEAD = [
    { id: 'name', label: 'Product', align: 'left' },
    { id: '' },
    { id: '' },
];

function ProductList() {
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
    } = useTable({
        defaultOrderBy: 'createdAt',
    });


    const { themeStretch } = useSettingsContext();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { product } = useSelector((state) => state.resource);

    const [tableData, setTableData] = useState([]);

    const [filterName, setFilterName] = useState('');

    const [filterStatus, setFilterStatus] = useState([]);

    const [openConfirm, setOpenConfirm] = useState(false);

    // useEffect(() => {
    //     // dispatch(getProducts());
    // }, [dispatch]);

    useEffect(() => {
        if (product?.length) {
            setTableData(product);
        }
    }, [product]);

    const dataFiltered = applyFilter({
        inputData: tableData,
        comparator: getComparator(order, orderBy),
        filterName,
        filterStatus,
    });

    const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const denseHeight = dense ? 60 : 80;

    const isNotFound = (!dataFiltered.length && !!filterName);

    const handleOpenConfirm = () => {
        setOpenConfirm(true);
    };

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
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



    const handleEditRow = (id) => {
        navigate(PATH_DASHBOARD.products.productEdit(id));
    };

    const handleViewRow = (id) => {
        navigate(PATH_DASHBOARD.eCommerce.view(paramCase(id)));
    };

    const handleResetFilter = () => {
        setFilterName('');
        setFilterStatus([]);
    };
    return (
        <>
            <Helmet>
                <title> Product List | Photokraft</title>
            </Helmet>

            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs
                    heading="Product List"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.dashbord },
                        { name: 'Product List' },
                    ]}
                    action={
                        <Button
                            component={RouterLink}
                            onClick={() => handleOpenConfirm()}
                            variant="contained"
                            startIcon={<Iconify icon="eva:plus-fill" />}
                        >
                            New Product
                        </Button>
                    }
                />

                <Card>

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
                                <Tooltip title="Delete">
                                    <IconButton color="primary" onClick={handleOpenConfirm}>
                                        <Iconify icon="eva:trash-2-outline" />
                                    </IconButton>
                                </Tooltip>
                            }
                        />

                        <Scrollbar>
                            <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
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
                                    {product?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) =>
                                            row && (
                                                <ProductTableRow
                                                    key={row.id}
                                                    row={row}
                                                    onViewRow={() => handleEditRow(row.name)}
                                                    onDeleteRow={() => handleDeleteRow(row.id)}
                                                    onEditRow={() => handleEditRow(row.name)}
                                                />
                                            )
                                        )}

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

                title="Create New Product"
                content={
                    <Grid spacing={3} >
                        <TextField sx={{ marginY: 2 }} label="Product Name" fullWidth />
                        <TextField sx={{ marginY: 2 }} type='file' fullWidth />
                    </Grid>
                }
                action={
                    <LoadingButton variant="contained" onClick={() => { }}>
                        Create
                    </LoadingButton>
                }
            />
        </>
    )
}

export default ProductList

function applyFilter({ inputData, comparator, filterName, filterStatus }) {
    const stabilizedThis = inputData.map((el, index) => [el, index]);

    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });

    inputData = stabilizedThis.map((el) => el[0]);

    if (filterName) {
        inputData = inputData.filter(
            (product) => product.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
        );
    }

    if (filterStatus.length) {
        inputData = inputData.filter((product) => filterStatus.includes(product.inventoryType));
    }

    return inputData;
}