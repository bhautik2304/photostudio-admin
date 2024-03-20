/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
//
import React, { useEffect, useState, forwardRef, useCallback } from 'react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Container,
  Stack,
  Divider,
  Button,
  CircularProgress,
  Paper,
  Autocomplete,
  Grid,
  Typography,
  Box,
  Accordion,
  AccordionActions,
  AccordionSummary,
  AccordionDetails,
  DialogContentText,
  TextField,
  FormControl,
  FormLabel,
  Dialog,
  Card,
  CardHeader,
  CardContent,
  InputAdornment,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
  colors,
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import LoadingButton from '@mui/lab/LoadingButton';
import { styled, alpha } from '@mui/material/styles';
import axios from 'axios';
// import { Stack } from '@mui/system';
import { LazyLoadImage } from 'react-lazy-load-image-component';
// @mui
import Iconify from '../../../../../components/iconify';
import Scrollbar from '../../../../../components/scrollbar';
import CustomBreadcrumbs from '../../../../../components/custom-breadcrumbs';
import ConfirmDialog from '../../../../../components/confirm-dialog';
import { PATH_DASHBOARD } from '../../../../../routes/paths';
import { useSettingsContext } from '../../../../../components/settings';
import { useSnackbar } from '../../../../../components/snackbar';
import SvgColor from '../../../../../components/svg-color/SvgColor';
import { fetchproduct } from '../../../../../redux/thunk';
import { apiRoutes } from '../../../../../constants';

function Index() {
  const { id } = useParams();
  const [productData, setProductData] = useState(false);
  const [value, setValue] = useState(false);
  const [addOrientationModelShow, setAddOrientationModelShow] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { product, countryzone } = useSelector((state) => state.resource);

  useEffect(() => {
    setProductData(product.find((data) => data.name === id));
  }, [product, id]);
  console.log(id);

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    // const files = value|| [];

    const newFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    // setValue('images', [...files, ...newFiles], { shouldValidate: true });
    setValue(newFiles[0]);
    console.log(newFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    onDrop,
  });

  // const hasFile = !!file && !multiple;

  // const hasFiles = files && multiple && files.length > 0;

  // const isError = isDragReject || !!error;

  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Product | Photokraft</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={`Edit ${productData?.name}`}
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.dashbord,
            },
            {
              name: 'Products',
              href: PATH_DASHBOARD.products.root,
            },
            { name: productData?.name },
          ]}
          action={
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              New Product
            </Button>
          }
        />
        <Paper elevation={3} style={{ padding: 30 }}>
          <Grid container>
            <Grid sm={6} xs={12} lg={6}>
              <Stack flex="colum" spacing={2} padding={5}>
                <FormControl>
                  <FormLabel>
                    <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                      Product Name
                    </Typography>
                  </FormLabel>
                  <TextField fullWidth value={productData.name} size="small" />
                </FormControl>
                <FormControl>
                  <FormLabel>
                    <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                      Minimum Page Requirement *
                    </Typography>
                  </FormLabel>
                  <TextField fullWidth value={productData.min_page} size="small" />
                </FormControl>
                <Divider />
                <center>Album Copy Price</center>
                {countryzone &&
                  productData &&
                  countryzone.map((data, key) => {
                    console.log(data);
                    return (
                      <FormControl>
                        <FormLabel>
                          <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                            Pocket Book Price In {`${data.zonename}`}
                          </Typography>
                        </FormLabel>
                        <AlbumCopyPriceField
                          fullWidth
                          sign={data.currency_sign}
                          productId={productData.id}
                          zoneId={data.id}
                          pricrData={productData.album_copy_price}
                          size="small"
                        />
                      </FormControl>
                    );
                  })}
                <Divider />
                <center>Printig Price</center>
                {countryzone &&
                  productData &&
                  countryzone.map((data, key) => {
                    console.log(data);
                    return (
                      <FormControl>
                        <FormLabel>
                          <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                            Printing Price In {`${data.zonename}`}
                          </Typography>
                        </FormLabel>
                        <PritnigPrice
                          fullWidth
                          sign={data.currency_sign}
                          productId={productData.id}
                          zoneId={data.id}
                          pricrData={productData.pritnig_price}
                          size="small"
                        />
                      </FormControl>
                    );
                  })}
              </Stack>
            </Grid>
            <Grid sm={6} xs={12} lg={6}>
              <Stack spacing={1} padding={0}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Images
                </Typography>

                <Box sx={{ width: 250, height: 350, position: 'relative' }}>
                  <StyledDropZone
                    {...getRootProps()}
                    sx={{
                      ...(isDragActive && {
                        opacity: 0.72,
                      }),
                    }}
                  >
                    <input {...getInputProps()} />

                    <SingleFilePreview file={value || productData?.img} />
                  </StyledDropZone>
                </Box>
              </Stack>
            </Grid>
            <Stack flexDirection="row" width="100%" justifyContent="flex-end" alignItems="flex-end">
              <Button variant="contained"> Save Changes </Button>
            </Stack>
          </Grid>
        </Paper>
        <Card sx={{ marginY: 5, padding: 2 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
            <CardHeader title="Orientations" sx={{ padding: 0 }} />
            <Stack spacing={3} direction="row">
              {/* <Button onClick={() => setAddSizeModelShow(true)} >Add Size</Button> */}
              <Button onClick={() => setAddOrientationModelShow(true)}>Add Orientation</Button>
            </Stack>
          </Stack>
          {productData
            ? productData?.orientation.map((data, key) => (
                <Orientation
                  key={key}
                  data={data}
                  setAddOrientationModelShow={setAddOrientationModelShow}
                />
              ))
            : null}
        </Card>
      </Container>

      <AddOrientationModel
        show={addOrientationModelShow}
        productId={productData?.id}
        onClose={() => setAddOrientationModelShow(false)}
      />
    </>
  );
}

export default Index;

const AlbumCopyPriceField = ({ sign, productId, zoneId, pricrData }) => {
  console.log(productId);

  const albumcopyPrice = pricrData.find(
    (data) => data.product_id === productId && data.countryzone_id === zoneId
  );
  const price = albumcopyPrice?.price || 0;
  console.log(price);
  const [value, setValue] = useState(price);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const data = {
    productid: productId,
    countryzone_id: zoneId,
    price: value,
  };

  const createPrice = () => {
    setLoad(true);
    axios
      .post(`${apiRoutes.productReq}productalbumcopyprice/`, data)
      .then((e) => {
        dispatch(fetchproduct());
        setLoad(false);
      })
      .catch((e) => {
        setLoad(false);
        setError(true);
      });
  };
  const updatePrice = () => {
    setLoad(true);
    axios
      .put(`${apiRoutes.productReq}productalbumcopyprice/${albumcopyPrice?.id}`, data)
      .then((e) => {
        setLoad(false);
        dispatch(fetchproduct());
      })
      .catch((e) => {
        setLoad(false);
        setError(true);
      });
  };

  return (
    <TextField
      InputProps={{
        startAdornment: <InputAdornment position="start">{sign}</InputAdornment>,
        endAdornment: (
          <InputAdornment position="end">
            {price ? (
              <IconButton loading={load} onClick={() => updatePrice()} color="warning">
                <SvgColor src="/assets/icons/product/edit.svg" sx={{ width: 18, height: 18 }} />
              </IconButton>
            ) : (
              <IconButton onClick={() => createPrice()} color="success">
                <SvgColor src="/assets/icons/product/plus.svg" sx={{ width: 18, height: 18 }} />
              </IconButton>
            )}
          </InputAdornment>
        ),
      }}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

const Orientation = ({ data, setAddOrientationModelShow }) => {
  const [addSizeModelShow, setAddSizeModelShow] = useState(false);

  return (
    <>
      <Accordion sx={{ margin: 2, backgroundColor: colors.grey }} elevation={3}>
        <AccordionSummary
          // sx={{}}
          // expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          {/* <CardHeader sx={{ width: '100%' }} title={
          } /> */}
          <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
            <Typography color="text.primary" variant="h6">
              {data?.orientation?.name}
            </Typography>
            <Stack spacing={3} direction="row">
              <Button onClick={() => setAddSizeModelShow(true)}>Add Size</Button>
            </Stack>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <CardContent>
            {data?.size.map((datas, key) => (
              <Size data={datas} />
            ))}
          </CardContent>
        </AccordionDetails>
      </Accordion>
      <AddSizeModel
        show={addSizeModelShow}
        onClose={() => setAddSizeModelShow(false)}
        productOrientationId={data.id}
      />
    </>
  );
};

const Size = ({ data }) => {
  console.log(data);
  const [addsheetShow, setAddsheetShow] = useState(false);
  const [addPapersShow, setAddPapersShow] = useState(false);
  const [addCoverShow, setAddCoverShow] = useState(false);
  const [addBoxsleeveShow, setAddBoxsleeveShow] = useState(false);
  return (
    <>
      <Accordion sx={{ marginY: 0, width: '100%', backgroundColor: colors.grey }} elevation={3}>
        <AccordionSummary
          // sx={{}}
          // expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Stack>
            <Typography color="text.primary" variant="subtitle1">
              Size : {data?.size?.name}
            </Typography>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          {/* Sheet type */}
          <Accordion sx={{ backgroundColor: colors.grey }} elevation={3}>
            <AccordionSummary
              // sx={{}}
              // expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <CardHeader
                title={
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={3}
                    justifyContent="space-between"
                    sx={{ width: '100%', padding: 0 }}
                  >
                    <Typography variant="h6">Paper Sheet</Typography>
                    <Button onClick={() => setAddsheetShow(true)}>Add Paper Sheet</Button>
                  </Stack>
                }
              />
            </AccordionSummary>
            <AccordionDetails>
              <CardContent>
                {data?.sheet.map((datas, key) => (
                  <ProductSheet data={datas} />
                ))}
              </CardContent>
            </AccordionDetails>
          </Accordion>

          {/* paper type */}
          <Accordion sx={{ marginY: 5, backgroundColor: colors.grey }} elevation={3}>
            <AccordionSummary
              // sx={{}}
              // expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <CardHeader
                title={
                  <Stack direction="row" alignItems="center" spacing={3}>
                    <Typography variant="h6">Paper Type</Typography>
                    <Button onClick={() => setAddPapersShow(true)}>Add Paper Type</Button>
                  </Stack>
                }
              />
            </AccordionSummary>
            <AccordionDetails>
              <CardContent>
                {data?.papers.map((datas, key) => (
                  <ProductPapers data={datas} />
                ))}
              </CardContent>
            </AccordionDetails>
          </Accordion>

          {/* Cover type */}
          <CardHeader
            title={
              <Stack direction="row" alignItems="center" spacing={3}>
                <Typography variant="h6">Product Cover</Typography>
                <Button onClick={() => setAddCoverShow(true)}>Add Cover</Button>
              </Stack>
            }
          />
          <CardContent>
            {data?.cover.map((datas, key) => (
              <ProductCover data={datas} />
            ))}
          </CardContent>

          {/* Product Box & Sleeve type */}
          <CardHeader
            title={
              <Stack direction="row" alignItems="center" spacing={3}>
                <Typography variant="h6">Product Box & Sleeve</Typography>
                <Button onClick={() => setAddBoxsleeveShow(true)}>Add Box & Sleeve</Button>
              </Stack>
            }
          />
          <CardContent>
            {data?.boxsleeve.map((datas, key) => (
              <ProductBoxsleeve data={datas} />
            ))}
          </CardContent>
        </AccordionDetails>
      </Accordion>

      <AddsheetModel sizeId={data.id} show={addsheetShow} onClose={() => setAddsheetShow(false)} />
      <AddPapersModel
        sizeId={data.id}
        show={addPapersShow}
        onClose={() => setAddPapersShow(false)}
      />
      <AddCoverModel sizeId={data.id} show={addCoverShow} onClose={() => setAddCoverShow(false)} />
      <AddBoxsleeveModel
        sizeId={data.id}
        show={addBoxsleeveShow}
        onClose={() => setAddBoxsleeveShow(false)}
      />
    </>
  );
};

const ProductSheet = ({ data }) => {
  const { countryzone } = useSelector((state) => state.resource);
  console.log('data');
  console.log(data);
  return (
    <Grid container>
      <Stack spacing={3} sx={{ marginTop: 3 }} direction="row">
        <Grid item sm="3" xs="12" lg="3">
          <TextField fullWidth value={data.sheet.name} label="Paper Sheet" disabled />
        </Grid>
        {countryzone.map((datas, key) => (
          <PriceTextField
            key={key}
            zoneId={datas.id}
            parentId={data.id}
            price={
              data.sheetprice.find((val) => Number(val.countryzone_id) === Number(datas.id))
                ?.price || 0
            }
            productResourcePriceId={
              data.sheetprice.find((val) => Number(val.countryzone_id) === Number(datas.id))?.id ||
              null
            }
            label={`Price in ${datas.zonename}`}
            sign={datas.currency_sign}
            url="productshetprice"
          />
        ))}
      </Stack>
    </Grid>
  );
};

const PriceTextField = ({ price, label, sign, zoneId, productResourcePriceId, parentId, url }) => {
  const [value, setValue] = useState(price);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState();
  const { themeStretch } = useSettingsContext();

  const dispatch = useDispatch();

  const data = {
    parentid: parentId,
    countryzone_id: zoneId,
    price: value,
  };

  const createPrice = () => {
    setLoad(true);
    axios
      .post(`${apiRoutes.productReq}${url}/`, data)
      .then((e) => {
        dispatch(fetchproduct());
        setLoad(false);
      })
      .catch((e) => {
        setLoad(false);
        setError(true);
      });
  };
  const updatePrice = () => {
    setLoad(true);
    axios
      .put(`${apiRoutes.productReq}${url}/${productResourcePriceId}`, data)
      .then((e) => {
        setLoad(false);
        dispatch(fetchproduct());
      })
      .catch((e) => {
        setLoad(false);
        setError(true);
      });
  };
  return (
    <Grid item sm="3" xs="12" lg="3">
      <TextField
        InputProps={{
          startAdornment: <InputAdornment position="start">{sign}</InputAdornment>,
          endAdornment: (
            <InputAdornment position="end">
              {price ? (
                <IconButton disabled={load} onClick={() => updatePrice()} color="warning">
                  {load ? (
                    <CircularProgress size={25} />
                  ) : (
                    <SvgColor src="/assets/icons/product/edit.svg" sx={{ width: 18, height: 18 }} />
                  )}
                </IconButton>
              ) : (
                <IconButton disabled={load} onClick={() => createPrice()} color="success">
                  {load ? (
                    <CircularProgress size={25} />
                  ) : (
                    <SvgColor src="/assets/icons/product/edit.svg" sx={{ width: 18, height: 18 }} />
                  )}
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
        fullWidth
        value={value}
        error={error}
        onChange={(e) => setValue(e.target.value)}
        type="number"
        label={label}
      />
      
    </Grid>
  );
};

const PritnigPrice = ({ sign, productId, zoneId, pricrData }) => {
  const albumcopyPrice = pricrData?.find(
    (data) => data.product_id === productId && data.countryzone_id === zoneId
  );
  const price = albumcopyPrice?.price || 0;
  console.log(price);
  const [value, setValue] = useState(price);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const data = {
    productid: productId,
    countryzone_id: zoneId,
    price: value,
  };

  const createPrice = () => {
    setLoad(true);
    axios
      .post(`${apiRoutes.productReq}printigprice/`, data)
      .then((e) => {
        dispatch(fetchproduct());
        setLoad(false);
      })
      .catch((e) => {
        setLoad(false);
        setError(true);
      });
  };
  const updatePrice = () => {
    setLoad(true);
    axios
      .put(`${apiRoutes.productReq}printigprice/${albumcopyPrice?.id}`, data)
      .then((e) => {
        setLoad(false);
        dispatch(fetchproduct());
      })
      .catch((e) => {
        setLoad(false);
        setError(true);
      });
  };

  return (
    <TextField
      InputProps={{
        startAdornment: <InputAdornment position="start">{sign}</InputAdornment>,
        endAdornment: (
          <InputAdornment position="end">
            {price ? (
              <IconButton loading={load} onClick={() => updatePrice()} color="warning">
                <SvgColor src="/assets/icons/product/edit.svg" sx={{ width: 18, height: 18 }} />
              </IconButton>
            ) : (
              <IconButton onClick={() => createPrice()} color="success">
                <SvgColor src="/assets/icons/product/plus.svg" sx={{ width: 18, height: 18 }} />
              </IconButton>
            )}
          </InputAdornment>
        ),
      }}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

const ProductAutoComplete = ({ optionData }) => {
  const [value, setValue] = useState();
  const [inputValue, setInputValue] = useState('');

  return <></>;
};

const ProductPapers = ({ data }) => {
  const { countryzone } = useSelector((state) => state.resource);
  console.log('data');
  console.log(data);
  return (
    <Grid container>
      <Stack spacing={3} sx={{ marginTop: 3 }} direction={{ lg: 'row', sm: 'row', xs: 'column' }}>
        <Grid item sm="6" xs="12" lg="6">
          <TextField fullWidth value={data.paper.name} label="Paper Type" disabled />
        </Grid>
        <Grid item sm="3" xs="12" lg="3">
          <TextField
            value={data.paper.value}
            InputProps={{
              endAdornment: <InputAdornment position="start">%</InputAdornment>,
            }}
            disabled
          />
        </Grid>
      </Stack>
    </Grid>
  );
};
const ProductCover = ({ data }) => {
  const { countryzone } = useSelector((state) => state.resource);
  console.log('data');
  console.log(data);
  return (
    <Grid container>
      <Stack spacing={3} sx={{ marginTop: 3 }} direction="row">
        <Grid item sm="3" xs="12" lg="3">
          <TextField fullWidth value={data.cover.name} label="Cover Name" disabled />
        </Grid>
        {countryzone.map((datas, key) => (
          <PriceTextField
            key={key}
            zoneId={datas.id}
            parentId={data.id}
            price={
              data.coverprice.find((val) => Number(val.countryzone_id) === Number(datas.id))
                ?.price || 0
            }
            productResourcePriceId={
              data.coverprice.find((val) => Number(val.countryzone_id) === Number(datas.id))?.id ||
              null
            }
            label={`Price in ${datas.zonename}`}
            sign={datas.currency_sign}
            url="productcoverprice"
          />
        ))}
      </Stack>
    </Grid>
  );
};
const ProductBoxsleeve = ({ data }) => {
  const { countryzone } = useSelector((state) => state.resource);
  console.log('data');
  console.log(data);
  return (
    <Grid container>
      <Stack spacing={3} sx={{ marginTop: 3 }} direction="row">
        <Grid item sm="3" xs="12" lg="3">
          <TextField fullWidth value={data.boxsleeve.name} label="Box & Sleeve Type" disabled />
        </Grid>
        {countryzone.map((datas, key) => (
          <PriceTextField
            key={key}
            zoneId={datas.id}
            parentId={data.id}
            price={
              data.boxsleeveprice.find((val) => Number(val.countryzone_id) === Number(datas.id))
                ?.price || 0
            }
            productResourcePriceId={
              data.boxsleeveprice.find((val) => Number(val.countryzone_id) === Number(datas.id))
                ?.id || null
            }
            label={`Price in ${datas.zonename}`}
            sign={datas.currency_sign}
            url="productboxsleeveprice"
          />
        ))}
      </Stack>
    </Grid>
  );
};

const AddOrientationModel = ({ show, onClose, productId }) => {
  const { orientation } = useSelector((state) => state.resource);

  // const filterSizeData = filterSizes(size, productOrientationSize, 'id', 'size_id') || []

  const dataArry =
    (orientation && orientation?.map((data) => ({ id: data.id, label: data.name }))) || [];

  const [value, setValue] = React.useState();
  const [inputValue, setInputValue] = React.useState('');
  const dispatch = useDispatch();

  const data = {
    product_id: productId,
    orientation_id: value?.id,
  };

  const storeOrientation = () => {
    axios.post(`${apiRoutes.productReq}productorientation/`, data).then((e) => {
      dispatch(fetchproduct());
      onClose();
    });
  };

  return (
    <Dialog open={show} onClose={onClose} className="test">
      <DialogTitle id="alert-dialog-title">Add Orientation</DialogTitle>
      <DialogContent>
        <Autocomplete
          value={value}
          onChange={(event, newValue) => {
            console.log(newValue);
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            console.log(newInputValue);
            setInputValue(newInputValue);
          }}
          id="controllable-states-demo"
          options={dataArry || []}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Select Orientation" fullWidth />}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={storeOrientation}>Save</Button>
        <Button onClick={onClose} color="error" autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const AddSizeModel = ({ show, onClose, productOrientationId }) => {
  // console.log(show);
  const { size } = useSelector((state) => state.resource);
  console.log(productOrientationId);
  // const filterSizeData = filterSizes(size, productOrientationSize, 'id', 'size_id') || []
  const dispatch = useDispatch();
  const dataArry = (size && size?.map((data) => ({ id: data.id, label: data.name }))) || [];

  const [value, setValue] = React.useState();
  const [inputValue, setInputValue] = React.useState('');

  const data = {
    productorientation_id: productOrientationId,
    size_id: value?.id,
  };

  const storeSize = () => {
    axios.post(`${apiRoutes.productReq}productsize/`, data).then((e) => {
      dispatch(fetchproduct());
      onClose();
    });
  };

  return (
    <Dialog open={show} onClose={onClose}>
      <DialogTitle id="alert-dialog-title">Add Size</DialogTitle>
      <DialogContent>
        <Autocomplete
          value={value}
          onChange={(event, newValue) => {
            console.log(newValue);
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            console.log(newInputValue);
            setInputValue(newInputValue);
          }}
          id="controllable-states-demo"
          options={dataArry || []}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Select Size" fullWidth />}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => storeSize()}>Save</Button>
        <Button onClick={onClose} color="error" autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const AddsheetModel = ({ show, onClose, sizeId }) => {
  const { sheet } = useSelector((state) => state.resource);
  // const filterSizeData = filterSizes(size, productOrientationSize, 'id', 'size_id') || []
  const dispatch = useDispatch();
  const dataArry = (sheet && sheet?.map((data) => ({ id: data.id, label: data.name }))) || [];

  const [value, setValue] = React.useState();
  const [inputValue, setInputValue] = React.useState('');

  const data = {
    product_size_id: sizeId,
    sheet_id: value?.id,
  };

  const storeSize = () => {
    axios.post(`${apiRoutes.productReq}sheet/`, data).then((e) => {
      dispatch(fetchproduct());
      onClose();
    });
  };

  return (
    <Dialog open={show} onClose={onClose}>
      <DialogTitle id="alert-dialog-title">Add Product Sheet</DialogTitle>
      <DialogContent>
        <Autocomplete
          value={value}
          onChange={(event, newValue) => {
            console.log(newValue);
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            console.log(newInputValue);
            setInputValue(newInputValue);
          }}
          id="controllable-states-demo"
          options={dataArry || []}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Select Size" fullWidth />}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => storeSize()}>Save</Button>
        <Button onClick={onClose} color="error" autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const AddPapersModel = ({ show, onClose, sizeId }) => {
  const { paper } = useSelector((state) => state.resource);
  // const filterSizeData = filterSizes(size, productOrientationSize, 'id', 'size_id') || []
  const dispatch = useDispatch();
  const dataArry = (paper && paper?.map((data) => ({ id: data.id, label: data.name }))) || [];

  const [value, setValue] = React.useState();
  const [inputValue, setInputValue] = React.useState('');

  const data = {
    product_size_id: sizeId,
    paper_id: value?.id,
  };

  const storeSize = () => {
    axios.post(`${apiRoutes.productReq}productpaper/`, data).then((e) => {
      dispatch(fetchproduct());
      onClose();
    });
  };

  return (
    <Dialog open={show} onClose={onClose}>
      <DialogTitle id="alert-dialog-title">Add Size</DialogTitle>
      <DialogContent>
        <Autocomplete
          value={value}
          onChange={(event, newValue) => {
            console.log(newValue);
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            console.log(newInputValue);
            setInputValue(newInputValue);
          }}
          id="controllable-states-demo"
          options={dataArry || []}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Select Size" fullWidth />}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => storeSize()}>Save</Button>
        <Button onClick={onClose} color="error" autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const AddCoverModel = ({ show, onClose, sizeId }) => {
  const { cover } = useSelector((state) => state.resource);
  // const filterSizeData = filterSizes(size, productOrientationSize, 'id', 'size_id') || []
  const dispatch = useDispatch();
  const dataArry = (cover && cover?.map((data) => ({ id: data.id, label: data.name }))) || [];

  const [value, setValue] = React.useState();
  const [inputValue, setInputValue] = React.useState('');

  const data = {
    product_size_id: sizeId,
    cover_id: value?.id,
  };

  const storeSize = () => {
    axios.post(`${apiRoutes.productReq}productcover/`, data).then((e) => {
      dispatch(fetchproduct());
      onClose();
    });
  };

  return (
    <Dialog open={show} onClose={onClose}>
      <DialogTitle id="alert-dialog-title">Add Size</DialogTitle>
      <DialogContent>
        <Autocomplete
          value={value}
          onChange={(event, newValue) => {
            console.log(newValue);
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            console.log(newInputValue);
            setInputValue(newInputValue);
          }}
          id="controllable-states-demo"
          options={dataArry || []}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Select Size" fullWidth />}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => storeSize()}>Save</Button>
        <Button onClick={onClose} color="error" autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const AddBoxsleeveModel = ({ show, onClose, sizeId }) => {
  const { boxsleev } = useSelector((state) => state.resource);
  // const filterSizeData = filterSizes(size, productOrientationSize, 'id', 'size_id') || []
  const dispatch = useDispatch();
  const dataArry = (boxsleev && boxsleev?.map((data) => ({ id: data.id, label: data.name }))) || [];

  const [value, setValue] = React.useState();
  const [inputValue, setInputValue] = React.useState('');

  const data = {
    product_size_id: sizeId,
    boxsleeve_id: value?.id,
  };

  const storeSize = () => {
    axios.post(`${apiRoutes.productReq}productboxsleeve/`, data).then((e) => {
      dispatch(fetchproduct());
      onClose();
    });
  };

  return (
    <Dialog open={show} onClose={onClose}>
      <DialogTitle id="alert-dialog-title">Add Size</DialogTitle>
      <DialogContent>
        <Autocomplete
          value={value}
          onChange={(event, newValue) => {
            console.log(newValue);
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            console.log(newInputValue);
            setInputValue(newInputValue);
          }}
          id="controllable-states-demo"
          options={dataArry || []}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Select Size" fullWidth />}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => storeSize()}>Save</Button>
        <Button onClick={onClose} color="error" autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const StyledDropZone = styled('div')(({ theme }) => ({
  outline: 'none',
  cursor: 'pointer',
  overflow: 'hidden',
  position: 'relative',
  height: 300,
  width: 550,
  padding: theme.spacing(5),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('padding'),
  backgroundColor: theme.palette.background.neutral,
  border: `1px dashed ${alpha(theme.palette.grey[500], 0.32)}`,
  '&:hover': {
    opacity: 0.72,
  },
}));

SingleFilePreview.propTypes = {
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

function SingleFilePreview({ file }) {
  console.log(typeof file);
  console.log(file);
  if (!file) {
    return null;
  }

  const imgUrl = typeof file === 'string' ? file : file.preview;

  return (
    <Image
      alt="file preview"
      src={imgUrl}
      sx={{
        top: 8,
        left: 8,
        zIndex: 8,
        borderRadius: 1,
        position: 'absolute',
        width: 'calc(100% - 16px)',
        height: 'calc(100% - 16px)',
      }}
    />
  );
}

function getRatio(ratio = '1/1') {
  return {
    '4/3': 'calc(100% / 4 * 3)',
    '3/4': 'calc(100% / 3 * 4)',
    '6/4': 'calc(100% / 6 * 4)',
    '4/6': 'calc(100% / 4 * 6)',
    '16/9': 'calc(100% / 16 * 9)',
    '9/16': 'calc(100% / 9 * 16)',
    '21/9': 'calc(100% / 21 * 9)',
    '9/21': 'calc(100% / 9 * 21)',
    '1/1': '100%',
  }[ratio];
}

const Image = forwardRef(
  ({ ratio, disabledEffect = false, effect = 'blur', sx, ...other }, ref) => {
    const content = (
      <Box
        component={LazyLoadImage}
        wrapperClassName="wrapper"
        effect={disabledEffect ? undefined : effect}
        placeholderSrc={disabledEffect ? '/assets/transparent.png' : '/assets/placeholder.svg'}
        sx={{ width: 1, height: 1, objectFit: 'cover' }}
        {...other}
      />
    );

    if (ratio) {
      return (
        <Box
          ref={ref}
          component="span"
          sx={{
            width: 1,
            lineHeight: 1,
            display: 'block',
            overflow: 'hidden',
            position: 'relative',
            pt: getRatio(ratio),
            '& .wrapper': {
              top: 0,
              left: 0,
              width: 1,
              height: 1,
              position: 'absolute',
              backgroundSize: 'cover !important',
            },
            ...sx,
          }}
        >
          {content}
        </Box>
      );
    }

    return (
      <Box
        ref={ref}
        component="span"
        sx={{
          lineHeight: 1,
          display: 'block',
          overflow: 'hidden',
          position: 'relative',
          '& .wrapper': {
            width: 1,
            height: 1,
            backgroundSize: 'cover !important',
          },
          ...sx,
        }}
      >
        {content}
      </Box>
    );
  }
);

Image.propTypes = {
  sx: PropTypes.object,
  effect: PropTypes.string,
  disabledEffect: PropTypes.bool,
  ratio: PropTypes.oneOf(['4/3', '3/4', '6/4', '4/6', '16/9', '9/16', '21/9', '9/21', '1/1']),
};

function filterSizes(sizeResource, productResourceArray, id, size_id) {
  // Extract unique size IDs from productSizeArray
  const usedSizeIds = new Set(productResourceArray.map((item) => size_id));

  // Filter sizeArray based on unused size IDs
  const unusedSizes = sizeResource.filter((size) => !usedSizeIds.has(id));

  return unusedSizes;
}
