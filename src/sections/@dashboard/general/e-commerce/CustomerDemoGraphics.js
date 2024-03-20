import PropTypes from 'prop-types';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
import { useSelector } from 'react-redux';
// utils
import { fNumber } from '../../../../utils/formatNumber';
// components
import Chart, { useChart } from '../../../../components/chart';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 240;

const LEGEND_HEIGHT = 72;

const StyledChart = styled('div')(({ theme }) => ({
    height: CHART_HEIGHT,
    marginTop: theme.spacing(5),
    '& .apexcharts-canvas svg': {
        height: CHART_HEIGHT,
    },
    '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
        overflow: 'visible',
    },
    '& .apexcharts-legend': {
        height: LEGEND_HEIGHT,
        alignContent: 'center',
        position: 'relative !important',
        borderTop: `solid 1px ${theme.palette.divider}`,
        top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
    },
}));

// ----------------------------------------------------------------------

EcommerceSaleByGender.propTypes = {
    chart: PropTypes.object,
    total: PropTypes.number,
    subheader: PropTypes.string,
};

export default function EcommerceSaleByGender({ subheader, total, chart, ...other }) {
    const theme = useTheme();


    const { customer: { customer }, resource: { countryzone } } = useSelector(state => state)

    const chartSeries = countryzone?.map(data => customer?.filter(datas => datas?.zone?.id === data?.id)?.length) || [];

    // console.log(countryzone?.map(data => customer?.filter(datas => datas?.zone?.id === data?.id)?.length));
    // console.log(countryzone?.map(data => data?.zonename));

    const chartColors = [
        [theme.palette.primary.light, theme.palette.primary.main],
        [theme.palette.warning.light, theme.palette.warning.main],
    ];

    // let title = [];

    const chartOptions = useChart({
        chart: {
            sparkline: {
                enabled: true,
            },
        },
        labels: countryzone?.map(data => data?.zonename),
        legend: {
            floating: true,
            horizontalAlign: 'center',
        },
        fill: {
            type: 'gradient',
            gradient: {
                colorStops: chartColors.map((colr) => [
                    { offset: 0, color: colr[0] },
                    { offset: 100, color: colr[1] },
                ]),
            },
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '65%',
                    dataLabels: {
                        value: { offsetY: 16 },
                        total: {
                            formatter: () => chartSeries?.length,
                        },
                    },
                },
            },
        },
        // ...options,
    });

    return (
        <Card {...other} >
            <CardHeader title="Customer Demographics" subheader={subheader} />
            <StyledChart dir="ltr">
                <Chart type="donut" series={chartSeries} options={chartOptions} height={150} />
            </StyledChart>
        </Card>
    );
}
