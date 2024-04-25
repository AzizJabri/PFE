import React, { useState, useEffect } from "react";
import ReactApexChart from 'react-apexcharts';
import { fetchProductByOrder } from "@/providers/Orders";
import { fetchProductNamesByIds } from "@/services/products";

export default function ProductChart(props) {
    const [chartData, setChartData] = useState({
        series: [],
        options: {
            chart: {
                height: 390,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    offsetY: 0,
                    startAngle: 0,
                    endAngle: 270,
                    hollow: {
                        margin: 20,
                        size: '20%',
                        background: 'transparent',
                        image: undefined,
                    },
                    dataLabels: {
                        name: {
                            show: false,
                        },
                        value: {
                            show: false,
                        }
                    },
                    barLabels: {
                        enabled: true,
                        useSeriesColors: true,
                        margin: 8,
                        fontSize: '15px',
                        formatter: function(seriesName, opts) {
                            return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
                        },
                    },
                }
            },
            colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5'],
            labels: [],
            responsive: [{
                breakpoint: 480,
                options: {
                    legend: {
                        show: false
                    }
                }
            }]
        },
        error: null,
    });

    useEffect(() => {
        // Fetch data
        fetchProductByOrder()
            .then(data => {
                const responseData = data.map(item => [item[0], item[1]]);
                const series = responseData.map(item => item[1]);
                const productIds = responseData.map(item => item[0]); // Extract product IDs

                // Fetch product names asynchronously
                fetchProductNamesByIds(productIds)
                    .then(productNames => {
                        // Use product names as labels
                        const labels = productNames.map((name, index) => name || `Product ${productIds[index]}`);

                        // Update state with fetched and processed data
                        setChartData(prevData => ({
                            ...prevData,
                            series: series,
                            options: {
                                ...prevData.options,
                                labels: labels,
                            }
                        }));
                    })
                    .catch(error => {
                        console.error('Error fetching product names:', error);
                        setChartData(prevData => ({ ...prevData, error: error.message }));
                    });
            })
            .catch(error => {
                console.error('Error fetching chart data:', error);
                setChartData(prevData => ({ ...prevData, error: error.message }));
            });
    }, []);

    const { series, options, error } = chartData;

    if (error) {
        return <div>Error: {error}</div>; // Render error message if data fetching fails
    }

    return (
        <div className="relative flex flex-col min-w-0 break-words bg-dark w-full mb-6 shadow-lg rounded">
            <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                            Performance
                        </h6>
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            TOP 5 Best Sales Products
                        </h2>
                    </div>
                </div>
            </div>
            <div className="mt-2" id="chart">
                <ReactApexChart options={options} series={series} type="radialBar" height={270} width={380} />
            </div>
        </div>
    );
}
